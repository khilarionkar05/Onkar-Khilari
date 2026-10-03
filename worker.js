const ALLOWED_ORIGINS = new Set([
    "https://onkar-khilari.engineerr.workers.dev",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
]);

const MAX_BODY_BYTES = 16 * 1024;
const MAX_FIRST_NAME_LENGTH = 80;
const MAX_LAST_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

function corsHeaders(request) {
    const origin = request.headers.get("Origin");
    const headers = {
        "Vary": "Origin"
    };

    if (origin && ALLOWED_ORIGINS.has(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
        headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
        headers["Access-Control-Allow-Headers"] = "Content-Type";
    }

    return headers;
}

function jsonResponse(body, status, request) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...corsHeaders(request)
        }
    });
}

function cleanText(value) {
    return typeof value === "string"
        ? value.trim()
        : "";
}

function isValidEmail(email) {
    return email.length <= MAX_EMAIL_LENGTH &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSubmission(payload) {
    if (!payload || typeof payload !== "object") {
        return "Invalid request body.";
    }

    const fields = {
        firstName: cleanText(payload.firstName),
        lastName: cleanText(payload.lastName),
        email: cleanText(payload.email),
        subject: cleanText(payload.subject),
        message: cleanText(payload.message)
    };

    if (!fields.firstName) {
        return "First name is required.";
    }

    if (!fields.email || !isValidEmail(fields.email)) {
        return "A valid email address is required.";
    }

    if (!fields.subject) {
        return "Subject is required.";
    }

    if (!fields.message) {
        return "Message is required.";
    }

    const limits = [
        ["first name", fields.firstName, MAX_FIRST_NAME_LENGTH],
        ["last name", fields.lastName, MAX_LAST_NAME_LENGTH],
        ["email", fields.email, MAX_EMAIL_LENGTH],
        ["subject", fields.subject, MAX_SUBJECT_LENGTH],
        ["message", fields.message, MAX_MESSAGE_LENGTH]
    ];

    for (const [label, value, limit] of limits) {
        if (value.length > limit) {
            return `${label} is too long.`;
        }
    }

    if (/[\r\n]/.test(fields.email) || /[\r\n]/.test(fields.subject)) {
        return "Invalid contact details.";
    }

    return fields;
}

async function sendContactEmail(fields, env) {
    if (!env.RESEND_API_KEY ||
        !env.CONTACT_TO_EMAIL ||
        !env.RESEND_FROM_EMAIL) {
        throw new Error("Email service is not configured.");
    }

    const timestamp = new Date().toISOString();
    const fullName =
        `${fields.firstName} ${fields.lastName}`.trim();
    const subject =
        `Portfolio Contact: ${fields.subject} — ${fullName}`;
    const text = [
        "New portfolio contact form submission",
        "",
        `Name: ${fullName}`,
        `Email: ${fields.email}`,
        `Subject: ${fields.subject}`,
        `Submitted: ${timestamp}`,
        "",
        "Message:",
        fields.message
    ].join("\n");

    const response = await fetch(
        "https://api.resend.com/emails",
        {
            method: "POST",
            headers: {
                "Authorization":
                    `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: env.RESEND_FROM_EMAIL,
                to: [env.CONTACT_TO_EMAIL],
                reply_to: fields.email,
                subject,
                text
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Resend returned status ${response.status}.`
        );
    }
}

async function handleContact(request, env) {
    const origin = request.headers.get("Origin");

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
        return jsonResponse(
            { success: false, error: "Origin is not allowed." },
            403,
            request
        );
    }

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders(request)
        });
    }

    if (request.method !== "POST") {
        return jsonResponse(
            { success: false, error: "Method not allowed." },
            405,
            request
        );
    }

    const contentType =
        request.headers.get("Content-Type") || "";
    const contentLength =
        Number(request.headers.get("Content-Length") || 0);

    if (!contentType.toLowerCase().includes("application/json")) {
        return jsonResponse(
            { success: false, error: "JSON request body is required." },
            415,
            request
        );
    }

    if (contentLength > MAX_BODY_BYTES) {
        return jsonResponse(
            { success: false, error: "Request is too large." },
            413,
            request
        );
    }

    let body;

    try {
        const rawBody = await request.text();

        if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
            return jsonResponse(
                { success: false, error: "Request is too large." },
                413,
                request
            );
        }

        body = JSON.parse(rawBody);
    } catch (error) {
        return jsonResponse(
            { success: false, error: "Invalid JSON request body." },
            400,
            request
        );
    }

    const submission = validateSubmission(body);

    if (typeof submission === "string") {
        return jsonResponse(
            { success: false, error: submission },
            400,
            request
        );
    }

    try {
        await sendContactEmail(submission, env);

        return jsonResponse(
            { success: true },
            200,
            request
        );
    } catch (error) {
        console.error("Contact email delivery failed:", error.message);

        return jsonResponse(
            {
                success: false,
                error: "Unable to deliver the message right now."
            },
            502,
            request
        );
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === "/api/contact") {
            return handleContact(request, env);
        }

        return env.ASSETS.fetch(request);
    }
};
