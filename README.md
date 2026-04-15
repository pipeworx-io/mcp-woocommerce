# mcp-woocommerce

WooCommerce MCP Pack — wraps the WooCommerce REST API v3

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `woo_list_products` | List products from a WooCommerce store. |
| `woo_get_product` | Get a single product by ID from a WooCommerce store. |
| `woo_list_orders` | List orders from a WooCommerce store. |
| `woo_get_order` | Get a single order by ID from a WooCommerce store. |
| `woo_list_customers` | List customers from a WooCommerce store. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "woocommerce": {
      "url": "https://gateway.pipeworx.io/woocommerce/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use woocommerce
```

## License

MIT
