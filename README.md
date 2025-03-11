This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Project Overview

# MyShop

MyShop is an e-commerce platform built using Next.js, Zustand for state management, and Shopify's Storefront API for product data. The application supports core e-commerce functionalities like product display, cart management, wishlist management, and checkout.

## Setup Instructions

1. Clone the repository:  
   ```sh
   git clone https://github.com/jishadaj/NextJs_Shopify_API_Integration.git
   cd NextJs_Shopify_API_Integration

2. Install npm : npm install      

3. ## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```plaintext
NEXT_PUBLIC_SHOPIFY_STORE_URL=your-shopify-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN=your-shopify-access-token

run the development server:

```bash
npm run dev
# or
yarn dev
```

## Architectural Decisions

1. Next.js for the Frontend

Tradeoff: The initial learning curve is slightly higher compared to plain React, but the benefits in performance and SEO outweigh this.

2. Zustand for State Management

Reasoning: Zustand is a lightweight, efficient state management solution that requires minimal boilerplate.

Tradeoff: While Zustand is simple and fast, it does not include built-in debugging tools like Redux DevTools.

3. Shopify Storefront API for Product Data

Reasoning: Shopify provides a robust and scalable solution for handling e-commerce functionalities.

Tradeoff: It limits customization options, and additional API calls may increase latency.

4. Tailwind CSS for Styling

Reasoning: Tailwind CSS enables rapid UI development and enforces a utility-first approach.

Tradeoff: The learning curve may be steep for developers unfamiliar with utility-first CSS frameworks.

5. Persisting State for Cart

Reasoning: The cart states are persisted using Zustand's persist middleware to maintain data across page refreshes.

Tradeoff: Local storage persistence may not be ideal for large-scale applications requiring server-side state management.

## Features

Product Listing

Product Details Page

Add to Cart, Remove from Cart, Update Quantity, Calculate Total

Checkout via Shopify Storefront API

Related Product Recommendations

SEO Optimized with Metadata

