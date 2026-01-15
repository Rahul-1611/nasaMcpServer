import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { fetch_apod } from "./helpers/nasaMcpHelper.js";
import { z } from "zod";

const server = new McpServer({
    name: "Nasa-Hub",
    version: "1.0.0"
});
server.registerTool("getApod",
    {
        title: "Fetch NASA APOD",
        description: "Fetch Astronomy Picture of the Day",
        inputSchema: {
            date: z.string().optional().describe("YYYY-MM-DD"),
            hd: z.boolean().optional(),
        }
    },
    async ({ date, hd }) => {
        const result = await fetch_apod({ date, hd });

        return {
            content: [
                { type: "text", text: JSON.stringify(result, null, 2) }
            ]
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);