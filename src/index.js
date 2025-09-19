import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const NASA_API_BASE = "";
const USER_AGENT = "";

const server = new McpServer({
    name: "Nasa-Hub",
    version: "1.0.0",
    capabilities: {
        tools: {}
    }
})



const transport = new StdioServerTransport();
await server.connect(transport);