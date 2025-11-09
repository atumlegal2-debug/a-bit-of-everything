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
      {/* Medieval Header Banner */}
      <div className="absolute top-0 left-0 right-0 z-20 h-16 bg-gradient-to-b from-secondary via-secondary/95 to-transparent border-b-4 border-primary/50 shadow-gold">
        <div className="flex items-center justify-center h-full px-4">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-gold)" }}>
            ⚔️ TAVERNA DO MERCADOR ⚔️
          </h1>
        </div>
      </div>

      <div className="flex h-full w-full pt-16">
        {/* Main Product Display Area - Medieval Stone Frame */}
        <div className="relative flex-[3] p-3" style={{ background: "var(--gradient-stone)" }}>
          <div className="relative h-full w-full overflow-y-auto rounded-lg p-3 shadow-deep border-4 border-secondary/50" style={{ background: "var(--gradient-wood)" }}>
            {/* Medieval Corner Decorations */}
            <div className="absolute top-1 left-1 w-8 h-8 border-l-4 border-t-4 border-primary/60 rounded-tl-lg"></div>
            <div className="absolute top-1 right-1 w-8 h-8 border-r-4 border-t-4 border-primary/60 rounded-tr-lg"></div>
            <div className="absolute bottom-1 left-1 w-8 h-8 border-l-4 border-b-4 border-primary/60 rounded-bl-lg"></div>
            <div className="absolute bottom-1 right-1 w-8 h-8 border-r-4 border-b-4 border-primary/60 rounded-br-lg"></div>
            
            <div className="grid grid-cols-3 gap-3 p-2">
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

        {/* Control Panel - Medieval Style */}
        <NumericKeypad onCodeSubmit={handleCodeSubmit} />
      </div>

      {/* Pickup Area - Medieval Chest Style */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 p-4 shadow-deep border-t-4 border-primary/40" style={{ background: "var(--gradient-secondary)" }}>
        <div className="h-20 w-full rounded-lg p-1 shadow-inner border-2 border-primary/30" style={{ background: "var(--gradient-stone)" }}>
          <div className="h-full w-full rounded-md flex items-center justify-center border-2 border-dashed border-primary/20" style={{ background: "var(--gradient-wood)" }}>
            <p className="font-medieval text-sm font-semibold text-primary drop-shadow-lg">
              {totalItems > 0 ? `🏆 ${totalItems} Item(s) • ${totalPrice.toFixed(2)} Moedas de Ouro` : "⚔️ Aguardando Pedido ⚔️"}
            </p>
          </div>
        </div>
        <div className="mt-1 text-center text-xs font-display font-bold uppercase tracking-wider text-primary/70">
          ⬇️ Cofre de Retirada ⬇️
        </div>
      </div>
    </div>
  );
};
