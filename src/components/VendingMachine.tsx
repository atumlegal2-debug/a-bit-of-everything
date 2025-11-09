import { useState } from "react";
import { VendingMachineConfig, ProductSlot, CartItem } from "@/types/vending";
import { VendingSlot } from "@/components/VendingSlot";
import { CartSummary } from "@/components/CartSummary";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

interface VendingMachineProps {
  config: VendingMachineConfig;
}

export const VendingMachine = ({ config }: VendingMachineProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleSlotClick = (slot: ProductSlot) => {
    if (!slot.product) return;

    const { product } = slot;

    // Handle different action types
    switch (product.actionType) {
      case "cart":
        handleAddToCart(slot.id, slot.product);
        break;
      
      case "link":
        if (product.actionData) {
          window.open(product.actionData, "_blank");
          toast.success(`Abrindo: ${product.name}`);
        }
        break;
      
      case "modal":
        toast.info(`Informações sobre: ${product.name}`, {
          description: `Preço: R$ ${product.price.toFixed(2)} | Estoque: ${product.stock}`,
        });
        break;
      
      case "custom":
        toast.info(`Ação customizada: ${product.actionData || "executada"}`);
        break;
    }
  };

  const handleAddToCart = (slotId: string, product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === slotId);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === slotId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            productId: slotId,
            quantity: 1,
            name: product.name,
            price: product.price,
          },
        ];
      }
    });

    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const getQuantityInCart = (slotId: string): number => {
    const item = cart.find((item) => item.productId === slotId);
    return item?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
    <>
      <div className="min-h-screen bg-gradient-bg p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Vending Machine Frame */}
          <div className="bg-card rounded-3xl shadow-2xl border-8 border-border/50 overflow-hidden">
            {/* Machine Header */}
            <div className="bg-gradient-primary p-6 text-center relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <h1 className="text-4xl font-bold text-primary-foreground mb-2 tracking-wider">
                  VENDING MACHINE
                </h1>
                <p className="text-primary-foreground/90 text-sm font-medium">
                  Clique no produto desejado
                </p>
              </div>
            </div>

            {/* Products Display Area */}
            <div 
              className="relative bg-gradient-to-b from-secondary/30 to-secondary/10 p-6 md:p-8 min-h-[600px]"
              style={{
                backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              
              {/* Slots Container - Relative positioning for absolute slots */}
              <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
                {config.slots.map((slot) => (
                  <VendingSlot
                    key={slot.id}
                    slot={slot}
                    onSlotClick={handleSlotClick}
                    quantity={getQuantityInCart(slot.id)}
                  />
                ))}
              </div>
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
      </div>

      {/* Cart Summary */}
      <CartSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />
    </>
  );
};
