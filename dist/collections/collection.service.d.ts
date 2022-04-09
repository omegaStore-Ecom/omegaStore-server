import { Model } from 'mongoose';
import { Collection } from 'src/types/collection';
import { SellerService } from './../seller/sellerservice';
export declare class CollectionService {
    private CollectionModule;
    private sellerService;
    constructor(CollectionModule: Model<Collection>, sellerService: SellerService);
    createCollection(collection: any, res: any, images: any, user: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findOne(id: any, res: any): Promise<any>;
    updateCollection(id: any, collection: any, res: any): Promise<any>;
    updateCollectionImage(id: any, images: any, res: any): Promise<any>;
    deleteCollection(id: any, res: any): Promise<any>;
}
