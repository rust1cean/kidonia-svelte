export interface ReactiveStore<T> {
  all: T[];
  write(...items: T[]): this;
  clear(): this;
}

export * from "./reactive-limited-array.svelte"
