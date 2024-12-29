/**
 * Identify the structure representation to make it more readable
 *
 * @example
 * type Struct = { a: string, b: number } & { c: boolean };
 * type ReadFriendlyStruct = Identify<Struct>; // It will output { a: string; b: number; c: boolean }
 * ```
 */
export type Identify<T> = { [K in keyof T]: T[K] } & {};
