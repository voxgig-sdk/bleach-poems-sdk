# BleachPoems SDK

Fetch the chapter-opening poems from every volume of Tite Kubo's Bleach manga as JSON

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Bleach Poems API

The Bleach Poems API is a small community service that returns the short opening poems printed at the start of each volume of Tite Kubo's *Bleach* manga, covering volumes 1 through 74. It is operated by an independent maintainer ("b_n_b") and hosted on [Render](https://render.com) at `https://bleach-poems.onrender.com`.

What you can do with the API:

- `GET /poems` — list every catalogued poem.
- `GET /poems/{id}` — fetch a single poem by its identifier (e.g. `/poems/5`).
- `GET /random` — return one randomly selected poem.

Operational notes: no authentication or API key is required, and no rate limits are documented. CORS is reported as disabled across all endpoints, so browser clients on a different origin may need a proxy. As a free Render-hosted service, the first request after an idle period can be slow while the dyno wakes.

## Try it

**TypeScript**
```bash
npm install bleach-poems
```

**Python**
```bash
pip install bleach-poems-sdk
```

**PHP**
```bash
composer require voxgig/bleach-poems-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/bleach-poems-sdk/go
```

**Ruby**
```bash
gem install bleach-poems-sdk
```

**Lua**
```bash
luarocks install bleach-poems-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { BleachPoemsSDK } from 'bleach-poems'

const client = new BleachPoemsSDK({})

// List all poems
const poems = await client.Poem().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o bleach-poems-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "bleach-poems": {
      "command": "/abs/path/to/bleach-poems-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Poem** | A single Bleach volume-opening poem, addressable as a collection at `/poems`, individually at `/poems/{id}`, or as a random pick via `/random`. | `/poems` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from bleachpoems_sdk import BleachPoemsSDK

client = BleachPoemsSDK({})

# List all poems
poems, err = client.Poem(None).list(None, None)

# Load a specific poem
poem, err = client.Poem(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'bleachpoems_sdk.php';

$client = new BleachPoemsSDK([]);

// List all poems
[$poems, $err] = $client->Poem(null)->list(null, null);

// Load a specific poem
[$poem, $err] = $client->Poem(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/bleach-poems-sdk/go"

client := sdk.NewBleachPoemsSDK(map[string]any{})

// List all poems
poems, err := client.Poem(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "BleachPoems_sdk"

client = BleachPoemsSDK.new({})

# List all poems
poems, err = client.Poem(nil).list(nil, nil)

# Load a specific poem
poem, err = client.Poem(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("bleach-poems_sdk")

local client = sdk.new({})

-- List all poems
local poems, err = client:Poem(nil):list(nil, nil)

-- Load a specific poem
local poem, err = client:Poem(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = BleachPoemsSDK.test()
const result = await client.Poem().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = BleachPoemsSDK.test(None, None)
result, err = client.Poem(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = BleachPoemsSDK::test(null, null);
[$result, $err] = $client->Poem(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Poem(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BleachPoemsSDK.test(nil, nil)
result, err = client.Poem(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Poem(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Bleach Poems API

- Upstream: [https://bleach-poems.onrender.com](https://bleach-poems.onrender.com)
- API docs: [https://freepublicapis.com/bleach-poems-api](https://freepublicapis.com/bleach-poems-api)

- Underlying poem text is the intellectual property of Tite Kubo / VIZ Media.
- The API itself is a community project; no explicit software licence is published on the service.
- Treat responses as fan-curated reference material rather than an official product.
- Attribute the original work to its publisher when redistributing the text.

---

Generated from the Bleach Poems API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
