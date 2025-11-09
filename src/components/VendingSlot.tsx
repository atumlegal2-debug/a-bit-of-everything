import { ProductSlot } from "@/types/vending";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface VendingSlotProps {
  slot: ProductSlot;
  onSlotClick: (slot: ProductSlot) => void;
  quantity: number;
}

export const VendingSlot = ({ slot, onSlotClick, quantity }: VendingSlotProps) => {
  const { code, position, product } = slot;
  const isOutOfStock = product && product.stock === 0;
  const isLowStock = product && product.stock > 0 && product.stock <= 3;

  return (
    <div
      className="absolute cursor-pointer group transition-all duration-300"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
      }}
      onClick={() => !isOutOfStock && onSlotClick(slot)}
    >
      {/* Slot Code Label */}
      <Badge 
        className="absolute -top-3 -left-2 z-20 bg-primary text-primary-foreground px-2.5 py-1 text-xs font-bold shadow-lg"
      >
        {code}
      </Badge>

      {/* Slot Container */}
      <div className="relative w-full h-full rounded-lg border-2 border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-product group-hover:shadow-xl group-hover:border-primary/50 transition-all">
        {product ? (
          <>
            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/95 to-transparent p-2 pt-8">
              <p className="text-xs font-semibold text-foreground truncate mb-0.5">
                {product.name}
              </p>
              <p className="text-sm font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            {/* Stock Badge */}
            {isLowStock && (
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2 text-xs bg-accent text-accent-foreground"
              >
                Últimas {product.stock}
              </Badge>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-muted/90 backdrop-blur-sm flex items-center justify-center">
                <Badge variant="destructive" className="text-sm font-bold">
                  Esgotado
                </Badge>
              </div>
            )}

            {/* Quantity Badge */}
            {quantity > 0 && (
              <Badge 
                className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground h-7 w-7 flex items-center justify-center p-0 text-sm font-bold"
              >
                {quantity}
              </Badge>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors pointer-events-none" />
          </>
        ) : (
          // Empty Slot Placeholder
          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-border/50 bg-muted/20">
            <Package className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-xs text-muted-foreground/50">Vazio</p>
          </div>
        )}
      </div>

      {/* Glass Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg" />
    </div>
  );
};
