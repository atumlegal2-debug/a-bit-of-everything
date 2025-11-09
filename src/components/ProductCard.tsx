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
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-product border-2",
        quantity > 0 ? "border-primary" : "border-border",
        isAdding && "animate-pulse-scale"
      )}
    >
      <div className="aspect-square relative overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {stock < 5 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Últimas {stock}
          </Badge>
        )}
        {quantity > 0 && (
          <Badge className="absolute top-2 left-2 bg-primary">
            {quantity} no carrinho
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <Badge variant="secondary" className="mb-2 text-xs">
            {category}
          </Badge>
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-2xl font-bold text-primary mt-1">
            R$ {price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {quantity > 0 ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRemove}
                className="h-9 w-9 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center font-semibold text-lg">
                {quantity}
              </div>
              <Button
                size="icon"
                onClick={handleAdd}
                disabled={quantity >= stock}
                className="h-9 w-9 bg-gradient-primary hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={handleAdd}
              disabled={stock === 0}
              className="w-full bg-gradient-primary hover:opacity-90 font-semibold"
            >
              {stock === 0 ? "Sem estoque" : "Adicionar"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
