
import axios from "axios";

export async function fetch_apod({ date , hd}) {
    const params = {
        api_key : process.env.NASA_API_KEY,
        ...(date && {date}),
        ...(hd && {hd})
    }

    const res = await axios.get("https://api.nasa.gov/planetary/apod",{params})

    return {
        title : res.data.title,
        date: res.data.date,
        url: res.data.hdurl ?? res.data.url,
        explanation: res.data.explanation,
        media_type: res.data.media_type
    }
}