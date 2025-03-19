import { GraphQLClient } from "graphql-request";
import { Product, ProductsResponse } from "@/types/shopify";
import cache from "./catch";

const client = new GraphQLClient(process.env.SHOPIFY_STORE_URL!, {
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  },
});

const storeUrl = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN!;

if (!storeUrl || !accessToken) {
  throw new Error("Shopify store URL or access token is missing.");
}

export const getProducts = async (
  first: number = 20,
  after?: string,
  searchQuery?: string,
  productType?: string,
  minPrice?: number,
  maxPrice?: number,
  vendor?: string
): Promise<ProductsResponse> => {
  const cacheKey = `products-${first}-${after || "initial"}-${searchQuery || "all"}-${productType || "all"}-${minPrice || "any"}-${maxPrice || "any"}-${vendor || "all"}`;
  const cachedData = cache.get<ProductsResponse>(cacheKey);

  if (cachedData) {
    console.log("Serving products from cache");
    return cachedData;
  }

  try {

    let filters: string[] = [];
    if (searchQuery) filters.push(`title:*${searchQuery}* OR product_type:*${searchQuery}*`);
    if (productType) filters.push(`product_type:'${productType}'`);
    if (vendor) filters.push(`vendor:'${vendor}'`);
    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.push(`variants.price:>=${minPrice} AND variants.price:<=${maxPrice}`);
    } else if (minPrice !== undefined) {
      filters.push(`variants.price:>=${minPrice}`);
    } else if (maxPrice !== undefined) {
      filters.push(`variants.price:<=${maxPrice}`);
    }
    
    const queryString = filters.length ? filters.join(" AND ") : "";

    const query = `
      query GetProducts($first: Int!, $after: String, $query: String) {
        products(first: $first, after: $after, query: $query) {
          edges {
            node {
              id
              title
              description
              featuredImage {
                url
              }
              vendor
              productType
              totalInventory
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const response = await fetch(storeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query,
        variables: { first, after: after || null, query: queryString },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const { data } = await response.json();
    cache.set(cacheKey, data);
    console.log("Fetched products from API", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const getProduct = async (id: string) => {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        featuredImage {
          url
          altText
        }
        vendor
        productType
        totalInventory
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(storeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables: { id } }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const { data } = await response.json();
  return data;
};

export const getRelatedProducts = async (
  first: number = 20,
  after?: string
): Promise<ProductsResponse> => {
  const cacheKey = `products-${first}-${after || "initial"}`;
  const cachedData = cache.get<ProductsResponse>(cacheKey);

  if (cachedData) {
    console.log("Serving products from cache");
    return cachedData;
  }

  try {
    const query = `
      query GetProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              title
              description
              featuredImage {
                url
              }
              vendor
              productType
              totalInventory
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const response = await fetch(storeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query,
        variables: { first, after: after || null },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const { data } = await response.json();
    cache.set(cacheKey, data);
    console.log("Fetched products from API", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
