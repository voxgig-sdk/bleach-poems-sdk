# BleachPoems SDK

Bleach Poems API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { BleachPoemsSDK } from 'bleach-poems'

const client = new BleachPoemsSDK({
  apikey: process.env.BLEACH-POEMS_APIKEY,
})

// List all poems
const poems = await client.Poem().list()
console.log(poems.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Poem** |  | `/poems` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from bleachpoems_sdk import BleachPoemsSDK

client = BleachPoemsSDK({
    "apikey": os.environ.get("BLEACH-POEMS_APIKEY"),
})

# List all poems
poems, err = client.Poem().list()
print(poems)

# Load a specific poem
poem, err = client.Poem().load({"id": "example_id"})
print(poem)
```

### PHP

```php
<?php
require_once 'bleachpoems_sdk.php';

$client = new BleachPoemsSDK([
    "apikey" => getenv("BLEACH-POEMS_APIKEY"),
]);

// List all poems
[$poems, $err] = $client->Poem()->list();
print_r($poems);

// Load a specific poem
[$poem, $err] = $client->Poem()->load(["id" => "example_id"]);
print_r($poem);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/bleach-poems-sdk/go"

client := sdk.NewBleachPoemsSDK(map[string]any{
    "apikey": os.Getenv("BLEACH-POEMS_APIKEY"),
})

// List all poems
poems, err := client.Poem(nil).List(nil, nil)
fmt.Println(poems)
```

### Ruby

```ruby
require_relative "BleachPoems_sdk"

client = BleachPoemsSDK.new({
  "apikey" => ENV["BLEACH-POEMS_APIKEY"],
})

# List all poems
poems, err = client.Poem().list
puts poems

# Load a specific poem
poem, err = client.Poem().load({ "id" => "example_id" })
puts poem
```

### Lua

```lua
local sdk = require("bleach-poems_sdk")

local client = sdk.new({
  apikey = os.getenv("BLEACH-POEMS_APIKEY"),
})

-- List all poems
local poems, err = client:Poem():list()
print(poems)

-- Load a specific poem
local poem, err = client:Poem():load({ id = "example_id" })
print(poem)
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
client = BleachPoemsSDK.test()
result, err = client.Poem().load({"id": "test01"})
```

### PHP

```php
$client = BleachPoemsSDK::test();
[$result, $err] = $client->Poem()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Poem(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BleachPoemsSDK.test
result, err = client.Poem().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Poem():load({ id = "test01" })
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

---

Generated from the Bleach Poems API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
