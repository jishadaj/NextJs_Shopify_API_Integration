import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";
import { CheckoutResponse } from "@/types/shopify";

const client = new GraphQLClient(process.env.SHOPIFY_STORE_URL!, {
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  },
});

export async function POST(request: Request) {
  const { items } = await request.json();

  const lineItems = items.map((item: any) => ({
    variantId: item.id,
    quantity: item.quantity,
  }));

  const mutation = `
    mutation CreateCheckout($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await client.request<CheckoutResponse>(mutation, {
      lineItems,
    });

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      console.error("Checkout Errors:", data.checkoutCreate.checkoutUserErrors);
      return NextResponse.json(
        { error: data.checkoutCreate.checkoutUserErrors[0].message },
        { status: 400 }
      );
    }

    console.log("Checkout Response:", data);
    return NextResponse.json({
      checkoutUrl: data.checkoutCreate.checkout.webUrl,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
