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
      {/* Medieval Product Container */}
      <div className="relative flex h-28 w-full items-center justify-center rounded-lg p-1 transition-all border-2 border-primary/20 shadow-lg group-hover:border-primary/60 group-hover:shadow-gold" 
           style={{ background: "linear-gradient(135deg, hsl(30 15% 25%), hsl(25 20% 18%))" }}>
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/40"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/40"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/40"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/40"></div>
        
        {product ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-auto object-contain transition-transform group-hover:scale-110 drop-shadow-xl"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: "var(--gradient-secondary)" }}>
                <span className="text-destructive text-xs font-display font-bold tracking-wider">❌ ESGOTADO</span>
              </div>
            )}
            {quantity > 0 && (
              <div className="absolute top-1 left-1 h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold shadow-gold border-2 border-secondary" style={{ background: "var(--gradient-gold)", color: "hsl(30 10% 10%)" }}>
                {quantity}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Package className="h-8 w-8 text-primary/20" />
          </div>
        )}
      </div>

      {/* Medieval Product Info */}
      <div className="text-card-foreground">
        <p className="text-xs font-medieval font-semibold leading-tight truncate text-primary">
          {product?.name || "Vazio"}
        </p>
        <p className="text-xs font-display font-bold tracking-wider" style={{ color: "hsl(45 95% 55%)" }}>{code}</p>
      </div>
    </div>
  );
};
