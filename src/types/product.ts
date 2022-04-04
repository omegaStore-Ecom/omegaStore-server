export interface Product extends Document {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
  productQuantity: number;
  productStatus: string;
  productBrand: string;
  productSeller: string;
}
