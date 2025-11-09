import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface NumericKeypadProps {
  onCodeSubmit: (code: string) => void;
}

export const NumericKeypad = ({ onCodeSubmit }: NumericKeypadProps) => {
  const [input, setInput] = useState("");

  const handleNumberClick = (num: string) => {
    if (input.length < 2) {
      setInput(input + num);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleSubmit = () => {
    if (input.length === 2) {
      onCodeSubmit(input.toUpperCase());
      setInput("");
    } else {
      toast.error("Digite um código válido (ex: A1, B2)");
    }
  };

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="flex w-48 flex-col p-5 shadow-deep border-l-8 relative overflow-hidden" style={{ 
      background: "linear-gradient(135deg, hsl(25 25% 22%), hsl(20 30% 18%), hsl(25 25% 22%))",
      borderColor: "hsl(45 90% 50% / 0.5)"
    }}>
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(45 90% 50%) 10px, hsl(45 90% 50%) 11px)" }}></div>
      
      <div className="relative flex flex-col items-center gap-5">
        {/* Elegant Display Panel */}
        <div className="w-full relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-display text-xs tracking-widest opacity-60" style={{ color: "hsl(45 95% 60%)" }}>
            CÓDIGO
          </div>
          <div className="h-20 w-full rounded-xl p-3 text-center text-4xl font-display font-bold shadow-deep border-4 relative overflow-hidden shine-effect" 
               style={{ 
                 background: "linear-gradient(135deg, hsl(25 30% 15%), hsl(20 35% 12%))",
                 borderColor: "hsl(45 90% 50% / 0.4)",
                 color: "hsl(120 100% 50%)",
                 textShadow: "0 0 10px hsl(120 100% 50%), 0 0 20px hsl(120 100% 40%)"
               }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
            <div className="relative">{input || "--"}</div>
          </div>
        </div>

        {/* Premium Keypad */}
        <div className="grid w-full grid-cols-3 gap-2.5">
          {buttons.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="relative flex aspect-square items-center justify-center rounded-lg shadow-lg active:scale-95 transition-all duration-200 text-base font-display font-bold overflow-hidden group"
              style={{ 
                background: "linear-gradient(135deg, hsl(30 15% 40%), hsl(25 20% 35%))",
                color: "hsl(45 100% 60%)",
                border: "2px solid hsl(45 90% 50% / 0.3)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 group-hover:scale-110 transition-transform">{num}</span>
            </button>
          ))}
          
          {/* Clear button - Red accent */}
          <button
            onClick={handleClear}
            className="relative flex aspect-square items-center justify-center rounded-lg shadow-lg active:scale-95 transition-all duration-200 overflow-hidden group"
            style={{ 
              background: "linear-gradient(135deg, hsl(0 60% 40%), hsl(0 65% 35%))",
              border: "2px solid hsl(0 70% 50% / 0.4)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <X className="h-5 w-5 text-destructive-foreground relative z-10 group-hover:scale-110 transition-transform" />
          </button>

          {/* Zero button */}
          <button
            onClick={() => handleNumberClick("0")}
            className="relative flex aspect-square items-center justify-center rounded-lg shadow-lg active:scale-95 transition-all duration-200 text-base font-display font-bold overflow-hidden group"
            style={{ 
              background: "linear-gradient(135deg, hsl(30 15% 40%), hsl(25 20% 35%))",
              color: "hsl(45 100% 60%)",
              border: "2px solid hsl(45 90% 50% / 0.3)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 group-hover:scale-110 transition-transform">0</span>
          </button>

          {/* Submit button - Golden highlight */}
          <button
            onClick={handleSubmit}
            className="relative flex aspect-square items-center justify-center rounded-lg shadow-gold active:scale-95 transition-all duration-200 overflow-hidden group shine-effect"
            style={{ 
              background: "var(--gradient-gold)",
              border: "2px solid hsl(140 50% 40%)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Check className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform" style={{ color: "hsl(30 10% 10%)" }} />
          </button>
        </div>

        {/* Luxurious Coin Slot */}
        <div className="mt-2 w-full relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-display text-xs tracking-widest opacity-60" style={{ color: "hsl(45 95% 60%)" }}>
            PAGAMENTO
          </div>
          <div className="h-28 w-full rounded-xl border-4 p-3 shadow-deep relative overflow-hidden" style={{ 
            background: "linear-gradient(135deg, hsl(25 30% 20%), hsl(20 35% 15%))",
            borderColor: "hsl(45 90% 50% / 0.4)"
          }}>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
            <div className="relative h-full flex flex-col items-center justify-center gap-2">
              <p className="text-center text-xs font-display font-bold tracking-[0.15em]" style={{ color: "hsl(45 100% 65%)" }}>
                🪙 MOEDAS 🪙
              </p>
              <div className="w-full h-12 rounded-lg border-3 border-dashed flex items-center justify-center relative overflow-hidden group" style={{ 
                borderColor: "hsl(45 90% 50% / 0.3)",
                background: "linear-gradient(180deg, hsl(25 20% 10%), hsl(20 25% 8%))"
              }}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-3xl relative z-10 animate-bounce">⬇️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
