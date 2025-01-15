export class Pagination {
	private page: Page;

	constructor(limit: number, offset: number = 0) {
		this.page = new Page(limit, offset);
	}

	public get offset(): number {
		return this.page.offset;
	}

	public get limit(): number {
		return this.page.limit;
	}

	public get fromCurrPage(): Page {
		return this.page;
	}

	public back(by: number) {
		this.page.offset -= by;
	}

	public next(by: number) {
		this.page.offset += by;
	}

	public prevPage(pageItemsCount: number): Page {
		const { limit, offset } = this;

		let fixedOffset: number = offset - limit - pageItemsCount;
		let fixedLimit: number = limit;

		if (fixedOffset < 0) {
			fixedLimit += fixedOffset;
			fixedOffset = 0;
		}

		return new Page(fixedLimit, fixedOffset);
	}
}

export class Page {
	constructor(
		public limit: number,
		public offset: number
	) {}
}
