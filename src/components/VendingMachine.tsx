import { useState } from "react";
import { VendingMachineConfig, ProductSlot, CartItem } from "@/types/vending";
import { VendingSlot } from "@/components/VendingSlot";
import { NumericKeypad } from "@/components/NumericKeypad";
import { toast } from "sonner";

interface VendingMachineProps {
  config: VendingMachineConfig;
}

export const VendingMachine = ({ config }: VendingMachineProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleCodeSubmit = (code: string) => {
    const slot = config.slots.find((s) => s.code === code);
    if (slot && slot.product) {
      handleSlotClick(slot);
    } else {
      toast.error(`Código ${code} não encontrado ou sem produto`);
    }
  };

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
    <div className="relative flex h-screen w-full flex-col overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
      {/* Elegant Medieval Header */}
      <div className="absolute top-0 left-0 right-0 z-20 h-20 border-b-8 border-primary/60 shadow-deep" style={{ background: "var(--gradient-secondary)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(45 90% 50% / 0.1) 2px, hsl(45 90% 50% / 0.1) 4px)" }}></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="relative">
            {/* Ornamental corners */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-4xl opacity-60">⚜️</div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-4xl opacity-60">⚜️</div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-[0.2em] text-glow-gold animate-pulse-scale" style={{ color: "hsl(45 100% 60%)" }}>
              TAVERNA DO MERCADOR
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-0.5" style={{ background: "var(--gradient-gold)" }}></div>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full pt-20">
        {/* Luxurious Product Display */}
        <div className="relative flex-[3] p-6" style={{ background: "linear-gradient(135deg, hsl(30 15% 25%), hsl(25 20% 20%), hsl(30 15% 25%))" }}>
          {/* Ornate border pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 10px, hsl(45 90% 50% / 0.2) 10px, hsl(45 90% 50% / 0.2) 11px)" }}></div>
          
          <div className="relative h-full w-full overflow-y-auto rounded-2xl p-6 shadow-deep border-8 shine-effect" style={{ 
            background: "linear-gradient(180deg, hsl(25 30% 22%), hsl(20 35% 18%))",
            borderImage: "linear-gradient(135deg, hsl(45 90% 50%), hsl(40 85% 45%), hsl(45 95% 55%)) 1"
          }}>
            {/* Decorative corner embellishments */}
            <div className="absolute top-2 left-2 w-12 h-12 border-l-4 border-t-4 border-primary rounded-tl-xl opacity-60"></div>
            <div className="absolute top-2 right-2 w-12 h-12 border-r-4 border-t-4 border-primary rounded-tr-xl opacity-60"></div>
            <div className="absolute bottom-2 left-2 w-12 h-12 border-l-4 border-b-4 border-primary rounded-bl-xl opacity-60"></div>
            <div className="absolute bottom-2 right-2 w-12 h-12 border-r-4 border-b-4 border-primary rounded-br-xl opacity-60"></div>
            
            {/* Inner decorative frame */}
            <div className="absolute top-6 left-6 right-6 bottom-6 border border-primary/20 rounded-lg pointer-events-none"></div>
            
            <div className="grid grid-cols-3 gap-4 relative z-10">
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
        </div>

        {/* Elegant Control Panel */}
        <NumericKeypad onCodeSubmit={handleCodeSubmit} />
      </div>

      {/* Luxurious Pickup Area */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-36 p-6 shadow-deep border-t-8" style={{ 
        background: "linear-gradient(180deg, hsl(25 25% 18%), hsl(20 30% 15%))",
        borderColor: "hsl(45 90% 50% / 0.6)"
      }}>
        <div className="h-24 w-full rounded-xl p-2 shadow-deep border-4 border-primary/40 relative overflow-hidden shine-effect" style={{ background: "var(--gradient-stone)" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          
          <div className="relative h-full w-full rounded-lg flex items-center justify-center border-4 border-dashed border-primary/30 backdrop-blur-sm" style={{ background: "linear-gradient(135deg, hsl(25 30% 20% / 0.8), hsl(20 35% 15% / 0.8))" }}>
            <div className="text-center">
              <p className="font-display text-lg font-bold tracking-wider text-glow-gold mb-1" style={{ color: "hsl(45 100% 60%)" }}>
                {totalItems > 0 ? `🏆 ${totalItems} Item(s)` : "⚔️ Pronto para Servir ⚔️"}
              </p>
              {totalItems > 0 && (
                <p className="font-medieval text-2xl font-bold text-glow-gold" style={{ color: "hsl(45 100% 65%)" }}>
                  {totalPrice.toFixed(2)} Moedas 🪙
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 text-center flex items-center justify-center gap-2">
          <span className="text-primary text-lg">⬇️</span>
          <span className="text-xs font-display font-bold uppercase tracking-[0.15em] text-primary/80">Cofre de Retirada</span>
          <span className="text-primary text-lg">⬇️</span>
        </div>
      </div>
    </div>
  );
};
