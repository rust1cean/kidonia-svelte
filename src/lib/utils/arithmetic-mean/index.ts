export class ArithmeticMean {
	constructor(
		private sum: number = 0,
		private count: number = 0
	) {}

	public static from(sum: number, count = 1): ArithmeticMean {
		return new ArithmeticMean(sum, count);
	}

	public get arithmeticMean(): number {
		return this.sum / this.count;
	}

	public recalculate(term: number): ArithmeticMean['arithmeticMean'] {
		this.sum += term;
		this.count += 1;
		return this.arithmeticMean;
	}
}
