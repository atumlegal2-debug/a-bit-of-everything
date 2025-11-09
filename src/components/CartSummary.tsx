import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

export const CartSummary = ({ totalItems, totalPrice, onCheckout }: CartSummaryProps) => {
  if (totalItems === 0) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 p-4 shadow-product border-primary/20 bg-card/95 backdrop-blur-sm z-50 animate-slide-up">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
              {totalItems}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">
              R$ {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        
        <Button
          onClick={onCheckout}
          size="lg"
          className="bg-gradient-accent hover:opacity-90 font-semibold gap-2"
        >
          <CreditCard className="h-5 w-5" />
          Finalizar
        </Button>
      </div>
    </Card>
  );
};
