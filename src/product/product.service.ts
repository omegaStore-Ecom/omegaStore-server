import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';
@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private ProductModule: Model<Product>) {}

  async createProduct(product, res, images) {
    try {
      const createdProduct = new this.ProductModule(product);
      createdProduct.productImage = images.map(image => image.filename);
      await createdProduct.save();
      return res.status(201).json({
        message: 'Product has been successfully created',
        product: createdProduct,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(res) {
    try {
      const products = await this.ProductModule.find();
      return res.status(200).json({
        products,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findOne(id, res) {
    try {
      const product = await this.ProductModule.findById(id);
      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      return res.status(200).json({
        product,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(id, product, res) {
    try {
      // const existedProduct = new this.ProductModule(product)
      const updatedProduct = await this.ProductModule.findByIdAndUpdate(
        id,
        product,
        { new: true },
      );
      console.log(updatedProduct, 'ppppppppppppppppppppppp');
      return res.status(200).json({
        message: 'Product has been successfully updated',
        product: updatedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateProductImage(id, images, res) {
    try {
      const updatedProduct = await this.ProductModule.findByIdAndUpdate(
        id,
        {
          $set: {
            productImage: images.map(image => image.filename),
          },
        },
        { new: true },
      );
      return res.status(200).json({
        message: 'Product has been successfully updated',
        product: updatedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(id, res) {
    try {
      const deletedProduct = await this.ProductModule.findByIdAndDelete(id);
      return res.status(200).json({
        message: 'Product has been successfully deleted',
        product: deletedProduct,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
