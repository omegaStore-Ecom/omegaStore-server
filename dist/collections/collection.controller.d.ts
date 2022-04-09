import { CollectionService } from './collection.service';
import { SellerService } from '../seller/sellerservice';
export declare class CollectionController {
    private readonly collectionService;
    private sellerService;
    constructor(collectionService: CollectionService, sellerService: SellerService);
    create(collection: any, res: any, images: any, user: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findById(res: any, id: string): Promise<any>;
    update(res: any, id: string, collection: any): Promise<any>;
    updateImage(res: any, id: string, images: any): Promise<any>;
    delete(res: any, id: string): Promise<any>;
}
