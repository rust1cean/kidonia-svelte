export class Pagination {
	constructor(
		public limit: number,
		public offset: number = 0
	) {}

	get prevOffset(): number {
		return this.offset - (this.limit - 1);
	}

	get prevLimit(): number {
		const { prevOffset, limit } = this;
		return prevOffset < limit ? prevOffset + 1 : limit;
	}

	prev(by: number) {
		this.offset -= by;
	}

	next(by: number) {
		this.offset += by;
	}
}
