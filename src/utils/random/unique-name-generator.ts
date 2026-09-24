
export class UniqueNameGenerator {
  private readonly names: readonly string[];
  private order: number[];
  private position = 0;

  constructor(private readonly random: () => number = Math.random) {
    this.names = UniqueNameGenerator.createNameCollection();
    this.order = this.createShuffledOrder();
  }

  /** Returns a name that has not occurred in the current 1,000-name cycle. */
  next(): string {
    if (this.position === this.names.length) {
      this.position = 0;
      this.order = this.createShuffledOrder();
    }

    return this.names[this.order[this.position++]];
  }

  /** Number of names already returned in the active cycle. */
  get usedInCurrentCycle(): number {
    return this.position;
  }

  private createShuffledOrder(): number[] {
    const order = Array.from({ length: this.names.length }, (_, index) => index);

    for (let index = order.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(this.random() * (index + 1));
      [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
    }

    return order;
  }

  private static createNameCollection(): string[] {
    // Every fragment has exactly two letters; 10 × 10 × 10 = 1,000 names.
    const adjectives = [
  "White", "Black", "Gray", "Red", "Blue", "Green", "Golden", "Silver",
  "Quiet", "Silent", "Brave", "Gentle", "Clever", "Curious", "Lucky", "Sleepy",
  "Swift", "Bright", "Dark", "Frosty", "Misty", "Sunny", "Merry", "Lonely",
  "Wild", "Calm", "Little", "Tiny", "Grand", "Flat", "Round", "Smooth",
  "Ancient", "Secret", "Hidden", "Wandering", " patient", "Sturdy", "Velvet", "Copper",
  "Weak", "Funny", "Shy", "Fasty", "Fat",

  "Fat", "Black", "Yellow", "Noisy", "Woody", "Happy", "Sad", "Hot",
  "Slim", "Loud", "Good", "Bad", "Big", "Small", "Cold",
  "Heavy", "Strong", "Angry", "Hoty", "Crazy", "Friendly", "Smart",
  
];

const nouns = [
  "Rabbit", "Fox", "Mouse", "Owl", "Wolf", "Bear", "Robin", "Badger",
  "Stone", "River", "Forest", "Meadow", "Mountain", "Cloud", "Willow", "Clover",
  "Lantern", "Compass", "Voyager", "Dreamer", "Painter", "Gardener", "Sailor", "Keeper",
  "Castle", "Harbor", "Cottage", "Bridge", "Crown", "Feather", "Acorn", "Pebble",
  "Comet", "Planet", "Island", "Garden", "Clock", "Muffin", "Button", "Teapot",
  "Sun", "Tree",  "Moon",
  
  "Apple", "Universe", "Candle", "Waterfall", "Dolphin", "Mirror", "Ocean",
"Blanket", "Dragon", "Hammer", "Orchard", "Kettle", "Ladder", "Market", "Needle",
"Pillow", "Quilt", "Saddle", "Tunnel", "Umbrella", "Village", "Whistle", "Yogurt",
"Anchor", "Basket", "Jigsaw", "Desert", "Engine", "Helmet", "Glacier", "Narbor", "Thunder", "Jungle",
// kitchen, lantern, meadow, napkin, orchard, parrot, quarry, ribbon, sandwich, tractor
// universe, valley, wagon, zipper, acorn, balcony, cabbage, dolphin, eagle, fountain
// giraffe, helmet, igloo, jigsaw, kangaroo, lemon, magnet, nest, octopus, penguin
// rainbow, scissors, thunder, violin, waterfall, canyon, diamond, elephant, flame
];
    //const starts = ["Ar", "Ja", "O", "Yo", "Gu", "Da", "Ce", "Li", "Q", "Zu"];
    //const middles = ["la", "le", "li", "lo", "ma", "go", "mi", "sa", "ne", "zi"];
    //const ends = ["ny", "ar", "en", "era", "na", "on", "or", "un", "vo", "ini"];

    let names = adjectives.flatMap((start) =>
      nouns.flatMap((middle) => start + ' ' + middle),
    );

    names = names.splice(0, 1000)

    if (names.length !== 1_000 || new Set(names).size !== names.length) {
      throw new Error("The name collection must contain exactly 1,000 unique names.");
    }

    return names;
  }
}


