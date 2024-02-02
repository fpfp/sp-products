export interface IProduct {
  id: number;
  productToken: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IProductCreationAttrs = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt'
>;
