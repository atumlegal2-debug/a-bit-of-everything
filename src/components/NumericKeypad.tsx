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
    <div className="flex w-36 flex-col bg-vending-blue p-3 shadow-lg">
      <div className="flex flex-col items-center gap-4">
        {/* Display */}
        <div className="h-16 w-full rounded-md bg-vending-black p-2 text-right text-3xl font-mono text-green-400 shadow-inner">
          {input || "--"}
        </div>

        {/* Keypad */}
        <div className="grid w-full grid-cols-3 gap-2">
          {buttons.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="flex aspect-square items-center justify-center rounded-full bg-gray-700 text-white shadow-md active:bg-gray-600 hover:bg-gray-600 transition-colors text-sm font-semibold"
            >
              {num}
            </button>
          ))}
          
          {/* Clear button */}
          <button
            onClick={handleClear}
            className="flex aspect-square items-center justify-center rounded-full bg-gray-700 text-white shadow-md active:bg-gray-600 hover:bg-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Zero button */}
          <button
            onClick={() => handleNumberClick("0")}
            className="flex aspect-square items-center justify-center rounded-full bg-gray-700 text-white shadow-md active:bg-gray-600 hover:bg-gray-600 transition-colors text-sm font-semibold"
          >
            0
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="flex aspect-square items-center justify-center rounded-full bg-green-500 text-white shadow-md active:bg-green-600 hover:bg-green-600 transition-colors"
          >
            <Check className="h-5 w-5" />
          </button>
        </div>

        {/* Card slot */}
        <div className="mt-4 h-24 w-full rounded-md border-2 border-dashed border-vending-dark-blue bg-vending-black/20 p-2 shadow-inner">
          <p className="text-center text-xs font-semibold text-white">
            INSIRA O CARTÃO
          </p>
          <div className="mt-2 h-1 w-full bg-vending-black"></div>
        </div>
      </div>
    </div>
  );
};
