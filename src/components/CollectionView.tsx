import { useState } from "react";
import { PlayerInventory, Drink } from "@/types/vending";
import { availableDrinks } from "@/config/vendingMachineConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CollectionViewProps {
  inventory: PlayerInventory;
  onBack: () => void;
}

export const CollectionView = ({ inventory, onBack }: CollectionViewProps) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-4 gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text" 
              style={{ backgroundImage: "var(--gradient-gold)" }}>
            📜 COLECIONADOR
          </h1>
          <p className="text-muted-foreground">
            {inventory.collection.length} / {availableDrinks.length} bebidas coletadas
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 rounded-full border-2 border-primary/30 overflow-hidden"
           style={{ background: "var(--gradient-stone)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${(inventory.collection.length / availableDrinks.length) * 100}%`,
            background: "var(--gradient-gold)",
          }}
        />
      </div>

      {/* Collection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {availableDrinks.map((drink) => {
          const isUnlocked = inventory.collection.includes(drink.id);
          const inventoryItem = inventory.drinks.find(d => d.drinkId === drink.id);
          const quantity = inventoryItem?.quantity || 0;

          return (
            <div
              key={drink.id}
              onClick={() => isUnlocked && setSelectedDrink(drink)}
              className={`relative rounded-xl p-4 border-4 border-primary/30 transition-all ${
                isUnlocked ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : ''
              }`}
              style={{
                background: isUnlocked ? "var(--gradient-wood)" : "var(--gradient-stone)",
                filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.3)',
              }}
            >
              {/* Quantity Badge */}
              {isUnlocked && quantity > 0 && (
                <div className="absolute top-2 left-2 text-sm font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                  x{quantity}
                </div>
              )}

              {/* Lock Overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              <div className="aspect-square relative">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              <div className="mt-3 space-y-2">
                <p className={`font-bold text-center truncate ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {isUnlocked ? drink.name : "???"}
                </p>
                
                {isUnlocked && (
                  <div className="flex justify-center gap-2">
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 border-2 border-red-500/50 text-red-600 dark:text-red-400 font-bold text-sm">
                      ❤️ {drink.health}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 border-2 border-blue-500/50 text-blue-600 dark:text-blue-400 font-bold text-sm">
                      💧 {drink.thirst}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg border-2 border-border"
           style={{ background: "var(--gradient-secondary)" }}>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {inventory.drinks.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total de Bebidas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{inventory.collection.length}</p>
          <p className="text-sm text-muted-foreground">Tipos Únicos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{inventory.coins}</p>
          <p className="text-sm text-muted-foreground">Moedas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {Math.round((inventory.collection.length / availableDrinks.length) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Completado</p>
        </div>
      </div>

      {/* Dialog de Detalhes */}
      <Dialog open={!!selectedDrink} onOpenChange={() => setSelectedDrink(null)}>
        <DialogContent className="max-w-lg border-4 border-primary/40 p-0 gap-0 overflow-hidden">
          {selectedDrink && (
            <div className="relative">
              {/* Header com Gradiente */}
              <div className="relative p-6 pb-4" style={{ background: "var(--gradient-gold)" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-3xl font-bold text-center text-primary-foreground drop-shadow-lg">
                    ✨ {selectedDrink.name} ✨
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-6" style={{ background: "var(--gradient-bg)" }}>
                {/* Imagem Grande com Destaque */}
                <div className="relative w-full aspect-square rounded-2xl p-8 border-4 border-primary/30 shadow-2xl transform hover:scale-105 transition-transform duration-300"
                     style={{ 
                       background: "var(--gradient-wood)",
                       boxShadow: "var(--shadow-gold)"
                     }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent" />
                  <img
                    src={selectedDrink.image}
                    alt={selectedDrink.name}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-fade-in"
                  />
                </div>

                {/* Stats com Ícones Maiores */}
                <div className="flex justify-center gap-4">
                  <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-red-500/30 to-red-600/20 border-2 border-red-500/60 shadow-lg">
                    <span className="text-3xl">❤️</span>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      {selectedDrink.health}
                    </span>
                    <span className="text-xs text-red-600/80 dark:text-red-400/80 font-semibold">Saúde</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/20 border-2 border-blue-500/60 shadow-lg">
                    <span className="text-3xl">💧</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedDrink.thirst}
                    </span>
                    <span className="text-xs text-blue-600/80 dark:text-blue-400/80 font-semibold">Sede</span>
                  </div>
                </div>

                {/* Frases com Estilo de Pergaminho */}
                <div className="space-y-3">
                  {selectedDrink.phrases.map((phrase, index) => (
                    <div 
                      key={index} 
                      className="relative p-4 rounded-xl border-2 border-primary/30 shadow-lg backdrop-blur-sm"
                      style={{ background: "var(--gradient-secondary)" }}
                    >
                      <div className="absolute top-2 left-2 text-2xl opacity-20">📜</div>
                      <p className="text-center text-sm md:text-base font-medium text-foreground/90 italic leading-relaxed pl-6">
                        {phrase}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quantidade com Destaque */}
                {inventory.drinks.find(d => d.drinkId === selectedDrink.id) && (
                  <div className="relative text-center p-4 rounded-xl border-4 border-primary/40 overflow-hidden shadow-xl"
                       style={{ 
                         background: "var(--gradient-gold)",
                         boxShadow: "var(--shadow-gold)"
                       }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                    <p className="relative z-10 text-xl font-bold text-primary-foreground flex items-center justify-center gap-2">
                      <Package className="w-5 h-5" />
                      Você possui: x{inventory.drinks.find(d => d.drinkId === selectedDrink.id)?.quantity}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};