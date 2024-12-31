export class ArithmeticMean {
	constructor(
		private sum: number = 0,
		private count: number = 0
	) {}

	public static from(sum: number, count = 1): ArithmeticMean {
		return new ArithmeticMean(sum, count);
	}

	public get floatArithmeticMean(): number {
		return this.sum / this.count;
	}

	public get intArithmeticMean(): number {
		return Math.round(this.sum / this.count);
	}

	public recalculate(term: number) {
		this.sum += term;
		this.count += 1;
	}
}
