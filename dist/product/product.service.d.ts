import { Model } from 'mongoose';
import { Product } from 'src/types/product';
import { SellerService } from './../seller/sellerservice';
export declare class ProductService {
    private ProductModule;
    private sellerService;
    constructor(ProductModule: Model<Product>, sellerService: SellerService);
    createProduct(product: any, res: any, images: any, user: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findOne(id: any, res: any): Promise<any>;
    updateProduct(id: any, product: any, res: any): Promise<any>;
    updateProductImage(id: any, images: any, res: any): Promise<any>;
    deleteProduct(id: any, res: any, user: any): Promise<any>;
}
