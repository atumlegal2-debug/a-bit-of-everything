export interface Drink {
  id: string;
  name: string;
  image: string;
  health: number;
  thirst: number;
}

export interface InventoryItem {
  drinkId: string;
  quantity: number;
  drink: Drink;
}

export interface PlayerInventory {
  coins: number;
  drinks: InventoryItem[];
  collection: string[]; // IDs das bebidas já obtidas pelo menos uma vez
}
