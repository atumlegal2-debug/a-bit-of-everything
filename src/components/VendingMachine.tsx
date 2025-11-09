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
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-vending-black">
      <div className="flex h-full w-full">
        {/* Main Product Display Area */}
        <div className="relative flex-[3] bg-gradient-to-br from-gray-300 to-gray-500 p-2 shadow-inner">
          <div className="relative h-full w-full overflow-y-auto rounded-lg bg-vending-black p-2 shadow-lg">
            <div className="grid grid-cols-3 gap-2">
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

        {/* Control Panel */}
        <NumericKeypad onCodeSubmit={handleCodeSubmit} />
      </div>

      {/* Pickup Area */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-28 bg-vending-black p-4 shadow-2xl">
        <div className="h-16 w-full rounded-lg bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 p-1 shadow-inner">
          <div className="h-full w-full rounded-md bg-vending-black flex items-center justify-center">
            <p className="text-sm text-green-400 font-mono">
              {totalItems > 0 ? `${totalItems} item(s) - R$ ${totalPrice.toFixed(2)}` : "Pronto para venda"}
            </p>
          </div>
        </div>
        <div className="mt-1 text-center text-xs font-bold uppercase text-gray-400">
          Puxe para recolher
        </div>
      </div>
    </div>
  );
};
