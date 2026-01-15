# NASA MCP Server

## Overview
This repository implements a lightweight Model Context Protocol (MCP) tool that fetches NASA's Astronomy Picture of the Day (APOD) using the MCP SDK. It exposes a single tool, `getApod`, which requests NASA's public APOD API, normalizes the response, and returns it via MCP server transports.

## Features
- Registers a MCP tool named `getApod` with structured input validation via Zod.
- Calls NASA's `planetary/apod` endpoint with configurable `date` and `hd` options.
- Handles API errors gracefully and surfaces meaningful diagnostics back to the calling agent.
- Uses STDIO transport to connect with Claude (or any MCP-compatible conductor) over stdin/stdout.

## Getting Started

### Prerequisites
- Node.js 18+ (or any version that supports ES modules)
- A NASA API key. Request one for free from [https://api.nasa.gov](https://api.nasa.gov).

### Installation

```bash
npm install
```

### Environment

Copy `.env.example` (if provided) or define the following variables before starting the server:

```bash
NASA_API_KEY=<your key>
USER_AGENT=Rahul-nasa-mcp/1.0   # optional, defaults to this value
```

`NASA_API_KEY` is required; the helper will throw a descriptive error if it is absent. `USER_AGENT` lets you override the HTTP User-Agent header sent to NASA.

## Usage

Start the MCP server:

```bash
npm start
```

With the server up, the MCP tool `getApod` is available to any MCP-compatible agent connected through STDIO. It takes an optional `date` (`YYYY-MM-DD`) and `hd` boolean to request the hi-res image.

### Example payload

```json
{
  "date": "2024-01-15",
  "hd": true
}
```

The resolved tool response contains the APOD `title`, `date`, `url` (preferring the HD asset), `explanation`, and `media_type`.

## Project Structure

- `src/index.js` – boots the MCP server, registers the `getApod` tool, and wires STDIO transport.
- `src/helpers/nasaMcpHelper.js` – wraps the NASA APOD fetch logic, enriches requests with API keys, and maps errors to friendly descriptions.

## Error Handling

The helper inspects HTTP responses and throws `Error` objects with a clear reason when NASA returns 403, 429, or other failures. Those errors bubble up to Claude (or any MCP client) so the agent can mention why the request failed.

## Testing

No automated tests are configured. Run `npm start` locally to exercise the MCP tool via your conductor of choice.

## Contribution

Contributions are welcome: open an issue or pull request with reproduction steps, any additional validation, and updated documentation where applicable.

## License

This project is released under the ISC License. See `LICENSE` for full terms.
