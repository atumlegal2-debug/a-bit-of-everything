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
      className="flex flex-col gap-3 cursor-pointer items-center text-center group animate-slide-up"
      onClick={() => !isOutOfStock && product && onSlotClick(slot)}
    >
      {/* Luxurious Product Frame */}
      <div className="relative flex h-36 w-full items-center justify-center rounded-xl p-2 transition-all duration-300 shadow-deep overflow-hidden shine-effect group-hover:scale-105" 
           style={{ 
             background: "linear-gradient(135deg, hsl(30 20% 28%), hsl(25 25% 22%), hsl(30 20% 28%))",
             border: "3px solid transparent",
             backgroundClip: "padding-box"
           }}>
        {/* Animated golden border */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
          background: "linear-gradient(135deg, hsl(45 100% 55%), hsl(40 95% 50%), hsl(45 100% 60%))",
          padding: "3px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}></div>
        
        {/* Ornate corners */}
        <div className="absolute top-1 left-1 w-5 h-5 border-l-3 border-t-3 rounded-tl-lg transition-colors duration-300" style={{ borderColor: "hsl(45 90% 50% / 0.4)" }}></div>
        <div className="absolute top-1 right-1 w-5 h-5 border-r-3 border-t-3 rounded-tr-lg transition-colors duration-300" style={{ borderColor: "hsl(45 90% 50% / 0.4)" }}></div>
        <div className="absolute bottom-1 left-1 w-5 h-5 border-l-3 border-b-3 rounded-bl-lg transition-colors duration-300" style={{ borderColor: "hsl(45 90% 50% / 0.4)" }}></div>
        <div className="absolute bottom-1 right-1 w-5 h-5 border-r-3 border-b-3 rounded-br-lg transition-colors duration-300" style={{ borderColor: "hsl(45 90% 50% / 0.4)" }}></div>
        
        {/* Inner glow effect */}
        <div className="absolute inset-2 rounded-lg border border-primary/10 pointer-events-none"></div>
        
        {product ? (
          <>
            {/* Product spotlight */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 h-full w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl filter brightness-95 group-hover:brightness-110"
            />
            
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm" style={{ background: "linear-gradient(135deg, hsl(0 70% 30% / 0.95), hsl(0 60% 25% / 0.95))" }}>
                <div className="text-center">
                  <span className="text-destructive-foreground text-sm font-display font-bold tracking-wider block mb-1">❌</span>
                  <span className="text-destructive-foreground text-xs font-display font-bold tracking-widest">ESGOTADO</span>
                </div>
              </div>
            )}
            
            {quantity > 0 && (
              <div className="absolute -top-2 -right-2 h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold shadow-gold border-3 border-secondary z-20 animate-pulse-scale" style={{ background: "var(--gradient-gold)", color: "hsl(30 10% 10%)" }}>
                {quantity}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center opacity-30">
            <Package className="h-10 w-10 text-primary mb-2" />
            <span className="text-xs font-display text-primary">Vazio</span>
          </div>
        )}
      </div>

      {/* Elegant Product Label */}
      <div className="relative px-3 py-2 rounded-lg" style={{ background: "linear-gradient(135deg, hsl(25 20% 25% / 0.6), hsl(20 25% 20% / 0.6))" }}>
        <p className="text-sm font-medieval font-bold leading-tight truncate mb-1" style={{ color: "hsl(45 100% 70%)" }}>
          {product?.name || "Vazio"}
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-4" style={{ background: "var(--gradient-gold)" }}></div>
          <p className="text-xs font-display font-bold tracking-[0.2em]" style={{ color: "hsl(45 95% 60%)" }}>{code}</p>
          <div className="h-px w-4" style={{ background: "var(--gradient-gold)" }}></div>
        </div>
      </div>
    </div>
  );
};
