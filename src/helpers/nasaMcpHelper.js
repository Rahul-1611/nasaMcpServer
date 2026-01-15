import axios from "axios";
import dotenv from "dotenv";
dotenv.config({
    quiet: true
});

const NASA_API_BASE = "https://api.nasa.gov";
const API_KEY = process.env.NASA_API_KEY;
const USER_AGENT = process.env.USER_AGENT || "Rahul-nasa-mcp/1.0";

export async function fetch_apod({ date, hd }) {
    try {
        if (!API_KEY) {
            const err = new Error("NASA_API_KEY is missing");
            err.code = "NO_API_KEY";
            throw err;
        }
        const params = {
            api_key: API_KEY,
            ...(date && { date }),
            ...(hd && { hd })
        }
        const headers = {
            "User-Agent": USER_AGENT,
        };

        const res = await axios.get(`${NASA_API_BASE}/planetary/apod`, {
            params,
            headers
        });
        return {
            title: res.data.title,
            date: res.data.date,
            url: res.data.hdurl ?? res.data.url,
            explanation: res.data.explanation,
            media_type: res.data.media_type
        }
    } catch (e) {
        // Map axios/NASA errors to a friendly message (and DO NOT print to stdout)
        const status = e.response?.status;
        const nasaMsg = e.response?.data?.error?.message || e.response?.data?.msg;
        const reason =
            status === 403 ? "Forbidden (check API key, date validity, or rate limits)" :
                status === 429 ? "Too Many Requests (rate limited)" :
                    status ? `HTTP ${status}` :
                        e.code || "UNKNOWN";

        const details = nasaMsg || e.message || String(e);

        // Throw a regular Error back to the tool handler; Claude will show it in the approval card
        const err = new Error(`APOD request failed: ${reason} – ${details}`);
        err.status = status;
        throw err;
    }
}