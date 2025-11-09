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
    <div className="min-h-screen bg-gradient-bg pb-32">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Vending Machine</h1>
              <p className="text-sm text-muted-foreground">Escolha seus produtos favoritos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

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
