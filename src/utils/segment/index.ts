export class Segment {
	constructor(
		public start: number,
		public end: number
	) {}

	public get len(): number {
		return this.end - this.start;
	}
}
