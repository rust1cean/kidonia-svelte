export class Pagination {
	constructor(
		public limit: number,
		public offset: number = 0
	) {}

	public get prevPagination(): Pagination {
		return new Pagination(this.prevLimit, this.prevOffset)
	}

	public get prevOffset(): number {
		return this.offset - (this.limit - 1);
	}

	public get prevLimit(): number {
		const { prevOffset, limit } = this;
		return prevOffset < limit ? prevOffset + 1 : limit;
	}

	public prev(by: number) {
		this.offset -= by;
	}

	public next(by: number) {
		this.offset += by;
	}
}
