import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CartSummary } from "@/components/CartSummary";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

import sodaCola from "@/assets/soda-cola.jpg";
import sodaOrange from "@/assets/soda-orange.jpg";
import chipsBBQ from "@/assets/chips-bbq.jpg";
import chocolate from "@/assets/chocolate.jpg";
import water from "@/assets/water.jpg";
import cheesePuffs from "@/assets/cheese-puffs.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Coca-Cola",
    price: 5.50,
    image: sodaCola,
    category: "Refrigerantes",
    stock: 10,
  },
  {
    id: "2",
    name: "Fanta Laranja",
    price: 5.00,
    image: sodaOrange,
    category: "Refrigerantes",
    stock: 8,
  },
  {
    id: "3",
    name: "Água Mineral",
    price: 3.00,
    image: water,
    category: "Bebidas",
    stock: 15,
  },
  {
    id: "4",
    name: "Ruffles BBQ",
    price: 7.50,
    image: chipsBBQ,
    category: "Salgadinhos",
    stock: 12,
  },
  {
    id: "5",
    name: "Cheetos",
    price: 6.50,
    image: cheesePuffs,
    category: "Salgadinhos",
    stock: 3,
  },
  {
    id: "6",
    name: "Chocolate Lacta",
    price: 4.50,
    image: chocolate,
    category: "Doces",
    stock: 20,
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: string, quantityChange: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityChange;
        
        if (newQuantity <= 0) {
          return prevCart.filter((item) => item.productId !== productId);
        }
        
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else if (quantityChange > 0) {
        return [...prevCart, { productId, quantity: quantityChange }];
      }
      
      return prevCart;
    });

    if (quantityChange > 0) {
      const product = products.find((p) => p.id === productId);
      toast.success(`${product?.name} adicionado ao carrinho!`);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    toast.success("Processando pagamento...", {
      description: `Total: R$ ${totalPrice.toFixed(2)}`,
    });
    setTimeout(() => {
      toast.success("Compra realizada com sucesso!", {
        description: "Retire seus produtos na máquina!",
      });
      setCart([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Vending Machine Frame */}
        <div className="bg-card rounded-3xl shadow-2xl border-8 border-border/50 overflow-hidden">
          {/* Machine Header with Logo */}
          <div className="bg-gradient-primary p-6 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h1 className="text-4xl font-bold text-primary-foreground mb-2 tracking-wider">
                VENDING MACHINE
              </h1>
              <p className="text-primary-foreground/90 text-sm font-medium">
                Selecione o código do produto
              </p>
            </div>
          </div>

          {/* Products Display Area - Glass Effect */}
          <div className="bg-gradient-to-b from-secondary/30 to-secondary/10 p-6 md:p-8 relative">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            {/* Product Grid with shelves */}
            <div className="relative grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
              {products.map((product, index) => (
                <div key={product.id} className="relative">
                  {/* Product Code Label */}
                  <div className="absolute -top-2 left-2 z-10 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold shadow-lg">
                    {String.fromCharCode(65 + Math.floor(index / 3))}{(index % 3) + 1}
                  </div>
                  <ProductCard
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>

            {/* Horizontal shelf dividers */}
            <div className="absolute inset-x-6 top-1/2 h-1 bg-border/30 pointer-events-none"></div>
          </div>

          {/* Machine Bottom Panel */}
          <div className="bg-muted/50 border-t-4 border-border p-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Itens: {totalItems}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
