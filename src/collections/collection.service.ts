import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/types/collection';
// import { Product } from '../models/product.schema';
import { SellerService } from './../seller/sellerservice';
@Injectable()
export class CollectionService {
  constructor(
    @InjectModel('Collection') private CollectionModule: Model<Collection>,
    private sellerService: SellerService,
  ) {}

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateCollection(id, collection, res) {
    try {
      // const existedProduct = new this.ProductModule(product)
      const updateCollection = await this.CollectionModule.findByIdAndUpdate(
        id,
        collection,
        { new: true },
      );
      console.log(updateCollection, 'ppppppppppppppppppppppp');
      return res.status(200).json({
        message: 'update has been successfully updated',
        product: updateCollection,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateCollectionImage(id, images, res) {
    try {
      const updateCollection = await this.CollectionModule.findByIdAndUpdate(
        id,
        {
          $set: {
            collectionImage: images.map(image => image.filename),
          },
        },
        { new: true },
      );
      return res.status(200).json({
        message: 'Collection has been successfully updated',
        collection: updateCollection,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteCollection(id, res) {
    try {
      const deletedCollection = await this.CollectionModule.findByIdAndDelete(
        id,
      );
      return res.status(200).json({
        message: 'Collection has been successfully deleted',
        product: deletedCollection,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
