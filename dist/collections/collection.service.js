"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const collection_1 = require("../types/collection");
const sellerservice_1 = require("./../seller/sellerservice");
let CollectionService = class CollectionService {
    constructor(CollectionModule, sellerService) {
        this.CollectionModule = CollectionModule;
        this.sellerService = sellerService;
    }
    async createCollection(collection, res, images, user) {
        try {
            const createdCollection = new this.CollectionModule(collection);
            createdCollection.collectionImage = images.filename;
            createdCollection.collectionOwner = user.id;
            await createdCollection.save();
            await this.sellerService.updateProductLimit(user.id, res, 1);
            return res.status(201).json({
                message: 'Collection has been successfully created ',
                collection: createdCollection,
            });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }
    async findAll(res) {
        try {
            const collections = await this.CollectionModule.find();
            return res.status(200).json({
                collections,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findOne(id, res) {
        try {
            const collection = await this.CollectionModule.findById(id);
            if (!collection) {
                res.status(404).json({
                    message: 'collection not found',
                });
            }
            return res.status(200).json({
                collection,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateCollection(id, collection, res) {
        try {
            const updateCollection = await this.CollectionModule.findByIdAndUpdate(id, collection, { new: true });
            console.log(updateCollection, 'ppppppppppppppppppppppp');
            return res.status(200).json({
                message: 'update has been successfully updated',
                product: updateCollection,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateCollectionImage(id, images, res) {
        try {
            const updateCollection = await this.CollectionModule.findByIdAndUpdate(id, {
                $set: {
                    collectionImage: images.map(image => image.filename),
                },
            }, { new: true });
            return res.status(200).json({
                message: 'Collection has been successfully updated',
                collection: updateCollection,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteCollection(id, res) {
        try {
            const deletedCollection = await this.CollectionModule.findByIdAndDelete(id);
            return res.status(200).json({
                message: 'Collection has been successfully deleted',
                product: deletedCollection,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
CollectionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Collection')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        sellerservice_1.SellerService])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map