import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!, {
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN!,
  },
});

export async function POST(request: Request) {
  const { items } = await request.json();

  const lineItems = items.map((item: any) => ({
    merchandiseId: item.id,
    quantity: item.quantity,
  }));

  const mutation = `
    mutation CreateCart($lineItems: [CartLineInput!]!) {
      cartCreate(input: { lines: $lineItems }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await client.request<{
      cartCreate: {
        cart: {
          id: string;
          checkoutUrl: string;
        };
        userErrors: {
          field: string[];
          message: string;
        }[];
      };
    }>(mutation, { lineItems });

    if (data.cartCreate.userErrors.length > 0) {
      console.error("Cart Errors:", data.cartCreate.userErrors);
      return NextResponse.json(
        { error: data.cartCreate.userErrors[0].message },
        { status: 400 }
      );
    }

    console.log("Cart Response:", data);
    return NextResponse.json({ cartUrl: data.cartCreate.cart.checkoutUrl });
  } catch (error) {
    console.error("Cart Error:", error);
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}
