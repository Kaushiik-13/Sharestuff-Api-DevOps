import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'src/entities/items.entity';
import { ItemImage } from 'src/entities/item-images.entity';
import { SellerProfile } from 'src/entities/sellers-profile.entity';
import { CreateItemDto } from './dto/itemPublish.dto';
import { UpdateItemDto } from './dto/UpdateItem.dto';
@Injectable()
export class ItemListingService {
    constructor(
        @InjectRepository(Item) private itemRepo: Repository<Item>,
        @InjectRepository(SellerProfile) private sellerRepo: Repository<SellerProfile>,
        @InjectRepository(ItemImage) private itemImgRepo: Repository<ItemImage>
    ) { }

    async itemListing(sellerId: string, dto: CreateItemDto, file: Express.Multer.File) {
        const seller = await this.sellerRepo.findOne({ where: { seller_id: sellerId } })
        if (!seller) throw new NotFoundException('seller profile already exists');

        const item = this.itemRepo.create({
            item_id: uuidv4(),
            seller_id: sellerId,
            title: dto.title,
            description: dto.description,
            price_per_day: dto.price_per_day,
            deposit_amount: dto.deposit_amount,
            main_image: file.buffer,
            conditions: dto.conditions,
            location: dto.location,
            status: 'available'
        });
        await this.itemRepo.save(item);
        return { message: 'Listing successful' };
    }

    async getProfilePic(item_id: string) {
        const user = await this.itemRepo.findOne({ where: { item_id: item_id } });
        if (!user || !user.main_image) {
            throw new NotFoundException('Profile picture not found');
        }
        return user.main_image;
    }
    // ✅ Update Item
    async updateItem(itemId: string, dto: UpdateItemDto, file?: Express.Multer.File) {
        const item = await this.itemRepo.findOne({ where: { item_id: itemId } });
        if (!item) throw new NotFoundException('Item not found');

        Object.assign(item, dto); // merge fields

        if (file && file.buffer) item.main_image = file.buffer;

        const updated = await this.itemRepo.save(item);
        return { message: 'Item updated successfully', item_id: updated.item_id };
    }

    // Soft Delete
    async softDeleteItem(itemId: string) {
        const item = await this.itemRepo.findOne({ where: { item_id: itemId } });
        if (!item) throw new NotFoundException('Item not found');

        item.is_deleted = true;
        await this.itemRepo.save(item);
        return { message: 'Item marked as deleted', item_id: item.item_id };
    }

    // Hard Delete
    async hardDeleteItem(itemId: string) {
        const item = await this.itemRepo.findOne({ where: { item_id: itemId } });
        if (!item) throw new NotFoundException('Item not found');

        await this.itemRepo.remove(item);
        return { message: 'Item permanently deleted' };
    }

    // Get Single Item (only UpdateItemDto fields)
    async getItem(itemId: string) {
        const item = await this.itemRepo.findOne({
            where: { item_id: itemId, is_deleted: false },
        });
        if (!item) throw new NotFoundException('Item not found');

        const { title, description, price_per_day, deposit_amount, conditions, location, status } = item;
        return { title, description, price_per_day, deposit_amount, conditions, location, status };
    }

    async addExtraImage(itemId: string, file: Express.Multer.File) {
        const item = await this.itemRepo.findOne({ where: { item_id: itemId } });
        if (!item || !item.main_image) throw new NotFoundException('Item not found');

        const img = this.itemImgRepo.create({
            image_id: uuidv4(),
            item_id: itemId,
            image_data: file.buffer,
        });

        await this.itemImgRepo.save(img);
        return { message: 'Additional image added', image_id: img.image_id };
    }
    // Delete an extra image
    async deleteExtraImage(imageId: string) {
        const img = await this.itemImgRepo.findOne({ where: { image_id: imageId } });
        if (!img) throw new NotFoundException('Image not found');

        await this.itemImgRepo.remove(img);
        return { message: 'Image deleted successfully' };
    }

    // Update an extra image
    async updateExtraImage(imageId: string, file: Express.Multer.File) {
        const img = await this.itemImgRepo.findOne({ where: { image_id: imageId } });
        if (!img) throw new NotFoundException('Image not found');

        img.image_data = file.buffer;
        await this.itemImgRepo.save(img);
        return { message: 'Image updated successfully', image_id: img.image_id };
    }

}