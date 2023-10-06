// Help "resolve" to the final type value of a type
export type Resolve<T> = {
  [Key in keyof T]: T[Key];
} & {};
