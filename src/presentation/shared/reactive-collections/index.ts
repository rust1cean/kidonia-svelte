export interface ReactiveStore<T> {
  all: T[];
  write(...items: T[]): void;
  clear(): void;
}

export * from "./create-reactive-stack.svelte"
export * from "./create-reactive-queue.svelte"
