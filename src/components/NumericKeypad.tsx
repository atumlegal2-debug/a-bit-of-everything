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
    <div className="flex w-40 flex-col p-4 shadow-deep border-l-4 border-primary/40" style={{ background: "var(--gradient-secondary)" }}>
      <div className="flex flex-col items-center gap-4">
        {/* Medieval Display - Scroll Style */}
        <div className="h-16 w-full rounded-md p-2 text-center text-3xl font-display font-bold shadow-inner border-2 border-primary/30" 
             style={{ background: "var(--gradient-wood)", color: "hsl(45 95% 55%)" }}>
          {input || "⚔️"}
        </div>

        {/* Medieval Keypad - Stone Buttons */}
        <div className="grid w-full grid-cols-3 gap-2">
          {buttons.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="flex aspect-square items-center justify-center rounded-md shadow-md active:shadow-inner transition-all text-sm font-display font-bold border-2 border-primary/20 hover:border-primary/60 hover:shadow-gold"
              style={{ background: "var(--gradient-stone)", color: "hsl(45 90% 55%)" }}
            >
              {num}
            </button>
          ))}
          
          {/* Clear button */}
          <button
            onClick={handleClear}
            className="flex aspect-square items-center justify-center rounded-md shadow-md active:shadow-inner transition-all border-2 border-destructive/40 hover:border-destructive hover:shadow-gold"
            style={{ background: "var(--gradient-stone)" }}
          >
            <X className="h-4 w-4 text-destructive" />
          </button>

          {/* Zero button */}
          <button
            onClick={() => handleNumberClick("0")}
            className="flex aspect-square items-center justify-center rounded-md shadow-md active:shadow-inner transition-all text-sm font-display font-bold border-2 border-primary/20 hover:border-primary/60 hover:shadow-gold"
            style={{ background: "var(--gradient-stone)", color: "hsl(45 90% 55%)" }}
          >
            0
          </button>

          {/* Submit button - Golden */}
          <button
            onClick={handleSubmit}
            className="flex aspect-square items-center justify-center rounded-md shadow-gold active:shadow-inner transition-all border-2 border-accent/40 hover:border-accent"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Check className="h-5 w-5" style={{ color: "hsl(30 10% 10%)" }} />
          </button>
        </div>

        {/* Coin Slot - Medieval Style */}
        <div className="mt-4 h-24 w-full rounded-md border-2 border-primary/40 p-2 shadow-inner" style={{ background: "var(--gradient-wood)" }}>
          <p className="text-center text-xs font-display font-bold tracking-wider text-primary">
            🪙 MOEDAS 🪙
          </p>
          <div className="mt-2 h-8 w-full rounded border-2 border-dashed border-primary/30 flex items-center justify-center" style={{ background: "hsl(25 20% 12%)" }}>
            <span className="text-2xl">⬇️</span>
          </div>
        </div>
      </div>
    </div>
  );
};
