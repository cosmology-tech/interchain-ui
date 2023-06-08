export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

// Type helper to support arbitrary union with known set of values and can be extended beyond those known values
// .ie
// type Pet = LiteralUnion<'dog' | 'cat', string>;
// const pet: Pet = ''; // will get autocomplete of 'dog' and 'cat' while the actual value is an arbitrary runtime value
export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);
