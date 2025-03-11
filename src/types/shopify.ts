export interface ProductVariant {
  id: string; 
  title: string; 
  price: {
    amount: string; 
    currencyCode: string; 
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage?: {
    url: string;
  };
  vendor: string; 
  productType: string; 
  totalInventory?: number; 
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
}

export interface ProductsResponse {
  products: {
    edges: {
      node: Product;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface CheckoutUserError {
  code: string;
  field: string[];
  message: string;
}

export interface CheckoutResponse {
  checkoutCreate: {
    checkout: {
      id: string;
      webUrl: string;
    };
    checkoutUserErrors: CheckoutUserError[];
  };
}

export interface CartResponse {
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
}