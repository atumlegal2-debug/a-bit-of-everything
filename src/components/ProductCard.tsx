import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  onAddToCart: (id: string, quantity: number) => void;
}

export const ProductCard = ({ id, name, price, image, category, stock, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setIsAdding(true);
      onAddToCart(id, 1);
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onAddToCart(id, -1);
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-300 bg-card rounded-xl border-2 cursor-pointer group",
        quantity > 0 ? "border-primary shadow-lg" : "border-border/50 hover:border-primary/50",
        isAdding && "animate-pulse-scale"
      )}
      onClick={quantity === 0 ? handleAdd : undefined}
    >
      {/* Product Image Slot */}
      <div className="aspect-[3/4] relative overflow-hidden bg-secondary/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Stock warning overlay */}
        {stock < 5 && stock > 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="text-xs">
              Só {stock}
            </Badge>
          </div>
        )}
        
        {/* Out of stock overlay */}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              ESGOTADO
            </Badge>
          </div>
        )}

        {/* Quantity badge */}
        {quantity > 0 && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-primary-foreground font-bold">
              {quantity}x
            </Badge>
          </div>
        )}

        {/* Price tag at bottom */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="text-white">
            <p className="text-xs font-medium opacity-90">{name}</p>
            <p className="text-lg font-bold">R$ {price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Controls - Only show when item is already in cart */}
      {quantity > 0 && (
        <div className="p-2 bg-primary/5 flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="flex-1 text-center font-bold text-sm">
            {quantity}
          </span>
          <Button
            size="icon"
            onClick={handleAdd}
            disabled={quantity >= stock}
            className="h-8 w-8 bg-gradient-primary hover:opacity-90"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
