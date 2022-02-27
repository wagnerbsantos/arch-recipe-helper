export interface Recipe {
   id: number;
   name: string;
   description: string;
   loot: Loot[];
   components: Recipe[];
   tier: number;
}

export interface Loot {
   name: string;
   qty: number;
}
