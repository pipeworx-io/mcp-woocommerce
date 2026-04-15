interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * WooCommerce MCP Pack — wraps the WooCommerce REST API v3
 *
 * BYO key: _apiKey = consumer_key, _apiSecret = consumer_secret, _storeUrl.
 * Auth: Basic auth with consumer_key:consumer_secret.
 * Tools: list/get products, list/get orders, list customers.
 */


async function wooFetch(storeUrl: string, key: string, secret: string, path: string): Promise<unknown> {
  const base = `${storeUrl}/wp-json/wc/v3`;
  const credentials = btoa(`${key}:${secret}`);
  const res = await fetch(`${base}${path}`, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WooCommerce API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'woo_list_products',
    description: 'List products from a WooCommerce store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'WooCommerce consumer key' },
        _apiSecret: { type: 'string', description: 'WooCommerce consumer secret' },
        _storeUrl: { type: 'string', description: 'Store URL (e.g., https://mystore.com)' },
        per_page: { type: 'number', description: 'Results per page (max 100, default 20)' },
        page: { type: 'number', description: 'Page number (default 1)' },
      },
      required: ['_apiKey', '_apiSecret', '_storeUrl'],
    },
  },
  {
    name: 'woo_get_product',
    description: 'Get a single product by ID from a WooCommerce store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'WooCommerce consumer key' },
        _apiSecret: { type: 'string', description: 'WooCommerce consumer secret' },
        _storeUrl: { type: 'string', description: 'Store URL (e.g., https://mystore.com)' },
        id: { type: 'number', description: 'Product ID' },
      },
      required: ['_apiKey', '_apiSecret', '_storeUrl', 'id'],
    },
  },
  {
    name: 'woo_list_orders',
    description: 'List orders from a WooCommerce store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'WooCommerce consumer key' },
        _apiSecret: { type: 'string', description: 'WooCommerce consumer secret' },
        _storeUrl: { type: 'string', description: 'Store URL (e.g., https://mystore.com)' },
        status: { type: 'string', description: 'Filter by status: any, pending, processing, on-hold, completed, cancelled, refunded, failed' },
        per_page: { type: 'number', description: 'Results per page (max 100, default 20)' },
        page: { type: 'number', description: 'Page number (default 1)' },
      },
      required: ['_apiKey', '_apiSecret', '_storeUrl'],
    },
  },
  {
    name: 'woo_get_order',
    description: 'Get a single order by ID from a WooCommerce store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'WooCommerce consumer key' },
        _apiSecret: { type: 'string', description: 'WooCommerce consumer secret' },
        _storeUrl: { type: 'string', description: 'Store URL (e.g., https://mystore.com)' },
        id: { type: 'number', description: 'Order ID' },
      },
      required: ['_apiKey', '_apiSecret', '_storeUrl', 'id'],
    },
  },
  {
    name: 'woo_list_customers',
    description: 'List customers from a WooCommerce store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'WooCommerce consumer key' },
        _apiSecret: { type: 'string', description: 'WooCommerce consumer secret' },
        _storeUrl: { type: 'string', description: 'Store URL (e.g., https://mystore.com)' },
        per_page: { type: 'number', description: 'Results per page (max 100, default 20)' },
        page: { type: 'number', description: 'Page number (default 1)' },
      },
      required: ['_apiKey', '_apiSecret', '_storeUrl'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const key = args._apiKey as string;
  const secret = args._apiSecret as string;
  const storeUrl = (args._storeUrl as string).replace(/\/+$/, '');

  switch (name) {
    case 'woo_list_products': {
      const perPage = (args.per_page as number) ?? 20;
      const page = (args.page as number) ?? 1;
      return wooFetch(storeUrl, key, secret, `/products?per_page=${perPage}&page=${page}`);
    }

    case 'woo_get_product': {
      const id = args.id as number;
      return wooFetch(storeUrl, key, secret, `/products/${id}`);
    }

    case 'woo_list_orders': {
      const perPage = (args.per_page as number) ?? 20;
      const page = (args.page as number) ?? 1;
      const status = args.status as string | undefined;
      let path = `/orders?per_page=${perPage}&page=${page}`;
      if (status) path += `&status=${status}`;
      return wooFetch(storeUrl, key, secret, path);
    }

    case 'woo_get_order': {
      const id = args.id as number;
      return wooFetch(storeUrl, key, secret, `/orders/${id}`);
    }

    case 'woo_list_customers': {
      const perPage = (args.per_page as number) ?? 20;
      const page = (args.page as number) ?? 1;
      return wooFetch(storeUrl, key, secret, `/customers?per_page=${perPage}&page=${page}`);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 } } satisfies McpToolExport;
