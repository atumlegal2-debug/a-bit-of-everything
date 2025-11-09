import { ProductSlot } from "@/types/vending";
import { Package } from "lucide-react";

interface VendingSlotProps {
  slot: ProductSlot;
  onSlotClick: (slot: ProductSlot) => void;
  quantity: number;
}

export const VendingSlot = ({ slot, onSlotClick, quantity }: VendingSlotProps) => {
  const { code, product } = slot;
  const isOutOfStock = product && product.stock === 0;

  return (
    <div
      className="flex flex-col gap-2 cursor-pointer items-center text-center group"
      onClick={() => !isOutOfStock && product && onSlotClick(slot)}
    >
      {/* Product Container */}
      <div className="relative flex h-28 w-full items-center justify-center rounded-lg bg-white/10 p-1 transition-all group-hover:bg-white/20">
        {product ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-auto object-contain transition-transform group-hover:scale-110"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-vending-black/80 flex items-center justify-center rounded-lg">
                <span className="text-red-500 text-xs font-bold">ESGOTADO</span>
              </div>
            )}
            {quantity > 0 && (
              <div className="absolute top-1 left-1 bg-green-500 text-white h-5 w-5 flex items-center justify-center rounded-full text-xs font-bold">
                {quantity}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Package className="h-8 w-8 text-white/20" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-white">
        <p className="text-xs font-medium leading-tight truncate">
          {product?.name || "Vazio"}
        </p>
        <p className="text-xs font-bold text-amber-300">{code}</p>
      </div>
    </div>
  );
};
