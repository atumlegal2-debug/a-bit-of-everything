import { Drink } from "@/types/vending";
import fantaNozEsquilo from "@/assets/fanta-noz-esquilo.png";
import fantaCafeBrasil from "@/assets/fanta-cafe-brasil.png";
import fantaAcademia from "@/assets/fanta-academia.png";
import fantaApito from "@/assets/fanta-apito.png";

export const availableDrinks: Drink[] = [
  {
    id: "fanta-cafe-brasil",
    name: "Fanta Café do Brasil",
    image: fantaCafeBrasil,
    health: 10,
    thirst: 30,
    phrases: [
      "☕ \"Do grão ao gole: a energia do Brasil que você não toma, você sente!\"",
      "💚 \"Nem todo super-herói usa capa. Alguns tomam uma Fanta Café do Brasil!\""
    ],
  },
  {
    id: "fanta-academia",
    name: "Fanta Academia",
    image: fantaAcademia,
    health: 20,
    thirst: 20,
    phrases: [
      "💪 \"Depois do treino, a melhor repetição é tomar uma Fanta Academia!\"",
      "🏋️ \"Não precisa de halter. Só levantar o copo e comemorar o 'gain'!\""
    ],
  },
  {
    id: "fanta-apito",
    name: "Fanta Apito",
    image: fantaApito,
    health: 25,
    thirst: 35,
    phrases: [
      "🚂 \"Tome uma Fanta Apito e faça a festa apitar!\"",
      "😄 \"Se for assobiar de tão gostosa, avisa a gente!\""
    ],
  },
  {
    id: "fanta-noz-esquilo",
    name: "Fanta Noz de Esquilo",
    image: fantaNozEsquilo,
    health: 15,
    thirst: 25,
    phrases: [
      "🐿️ \"Tão gostosa que até esquilo esquece onde esconde!\"",
      "🥜 \"Sabor Noz de Esquilo: crocante de felicidade na primeira golada!\""
    ],
  },
];

export const GACHA_COST = 25;
export const SPIN_DURATION = 10000; // 10 segundos
