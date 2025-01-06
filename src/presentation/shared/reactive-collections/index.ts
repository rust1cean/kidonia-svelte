export interface ReactiveStore<T> {
  all: T[];
  write(...items: T[]): void;
  clear(): void;
}

export * from "./create-reactive-limited-array.svelte"
