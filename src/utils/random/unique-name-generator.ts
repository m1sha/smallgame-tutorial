
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
    const starts = ["Ar", "Ja", "O", "Yo", "Gu", "Da", "Ce", "Li", "Q", "Zu"];
    const middles = ["la", "le", "li", "lo", "ma", "go", "mi", "sa", "ne", "zi"];
    const ends = ["ny", "ar", "en", "era", "na", "on", "or", "un", "vo", "ini"];

    const names = starts.flatMap((start) =>
      middles.flatMap((middle) => ends.map((end) => start + middle + end)),
    );

    if (names.length !== 1_000 || new Set(names).size !== names.length) {
      throw new Error("The name collection must contain exactly 1,000 unique names.");
    }

    return names;
  }
}
