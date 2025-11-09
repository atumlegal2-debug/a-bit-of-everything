export type ProductAction = "cart" | "link" | "modal" | "custom";

export interface ProductSlot {
  id: string;
  code: string;
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  product?: {
    name: string;
    price: number;
    image: string;
    stock: number;
    actionType: ProductAction;
    actionData?: string; // URL para links, ou dados customizados
  };
}

export interface VendingMachineConfig {
  backgroundImage?: string;
  slots: ProductSlot[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}
