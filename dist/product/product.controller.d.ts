import { ProductService } from './product.service';
import { SellerService } from "../seller/sellerservice";
export declare class ProductController {
    private readonly productService;
    private sellerService;
    constructor(productService: ProductService, sellerService: SellerService);
    create(product: any, res: any, images: any, user: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findById(res: any, id: string): Promise<any>;
    update(res: any, id: string, product: any): Promise<any>;
    updateImage(res: any, id: string, images: any): Promise<any>;
    delete(res: any, id: string, user: any): Promise<any>;
}
