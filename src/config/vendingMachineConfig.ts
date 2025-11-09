import { Drink } from "@/types/vending";
import fantaNozEsquilo from "@/assets/fanta-noz-esquilo.png";
import fantaCafeBrasil from "@/assets/fanta-cafe-brasil.png";
import fantaAcademia from "@/assets/fanta-academia.png";
import fantaApito from "@/assets/fanta-apito.png";

export const availableDrinks: Drink[] = [
  {
    id: "fanta-noz-esquilo",
    name: "Fanta Noz de Esquilo",
    image: fantaNozEsquilo,
    health: 15,
    thirst: 25,
  },
  {
    id: "fanta-cafe-brasil",
    name: "Fanta Café do Brasil",
    image: fantaCafeBrasil,
    health: 10,
    thirst: 30,
  },
  {
    id: "fanta-academia",
    name: "Fanta Academia",
    image: fantaAcademia,
    health: 20,
    thirst: 20,
  },
  {
    id: "fanta-apito",
    name: "Fanta Apito",
    image: fantaApito,
    health: 25,
    thirst: 35,
  },
];

export const GACHA_COST = 25;
export const SPIN_DURATION = 10000; // 10 segundos
