# mcp-woocommerce

WooCommerce MCP Pack — wraps the WooCommerce REST API v3

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `woo_list_products` | List products from a WooCommerce store. |
| `woo_get_product` | Get a single product by ID from a WooCommerce store. |
| `woo_list_orders` | List orders from a WooCommerce store. |
| `woo_get_order` | Get a single order by ID from a WooCommerce store. |
| `woo_list_customers` | List customers from a WooCommerce store. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "woocommerce": {
      "url": "https://gateway.pipeworx.io/woocommerce/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Woocommerce data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
