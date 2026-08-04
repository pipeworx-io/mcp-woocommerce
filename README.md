# mcp-woocommerce

WooCommerce MCP Pack — wraps the WooCommerce REST API v3

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `woo_list_products` | List products from a WooCommerce store using Basic auth (consumer key + secret). Returns product IDs, names, prices, stock status, and type. Supports per_page (max 100) and page for pagination. |
| `woo_get_product` | Fetch a single WooCommerce product by numeric ID. Returns full details including name, description, price, categories, attributes, and stock quantity. |
| `woo_list_orders` | List WooCommerce orders, optionally filtered by status (pending, processing, on-hold, completed, cancelled, refunded, failed). Returns order IDs, totals, customer info, and line items. |
| `woo_get_order` | Fetch a single WooCommerce order by numeric ID. Returns full order details including line items, customer billing/shipping, payment method, totals, and current status. |
| `woo_list_customers` | List customers registered in a WooCommerce store. Returns customer IDs, names, emails, and order counts. Supports per_page (max 100) and page for pagination. |

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
