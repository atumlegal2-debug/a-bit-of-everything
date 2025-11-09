import { useState, useEffect } from "react";
import { PlayerInventory } from "@/types/vending";
import { GachaMachine } from "@/components/GachaMachine";
import { CollectionView } from "@/components/CollectionView";

const INITIAL_COINS = 100;

export const VendingMachine = () => {
  const [showCollection, setShowCollection] = useState(false);
  const [inventory, setInventory] = useState<PlayerInventory>(() => {
    const saved = localStorage.getItem('gacha-inventory');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      coins: INITIAL_COINS,
      drinks: [],
      collection: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('gacha-inventory', JSON.stringify(inventory));
  }, [inventory]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden" 
         style={{ background: "var(--gradient-bg)" }}>
      {showCollection ? (
        <CollectionView 
          inventory={inventory} 
          onBack={() => setShowCollection(false)} 
        />
      ) : (
        <GachaMachine
          inventory={inventory}
          onInventoryUpdate={setInventory}
          onShowCollection={() => setShowCollection(true)}
        />
      )}
    </div>
  );
};
