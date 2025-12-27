import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'src/entities/items.entity';
import { ItemImage } from 'src/entities/item-images.entity';
import { SellerProfile } from 'src/entities/sellers-profile.entity';
import { CreateItemDto } from './dto/itemPublish.dto';
@Injectable()
export class ItemListingService {
    constructor(
        @InjectRepository(Item) private itemRepo: Repository<Item>, 
        @InjectRepository(SellerProfile) private sellerRepo : Repository<SellerProfile>,
        @InjectRepository(ItemImage) private itemImgRepo:Repository<ItemImage>
    ){}

    async itemListing(sellerId:string,dto:CreateItemDto,file: Express.Multer.File)
    {
        const seller = await this.sellerRepo.findOne({where:{seller_id:sellerId}})
        if(!seller) throw new NotFoundException('seller profile already exists');

        const item=this.itemRepo.create({
            item_id:uuidv4(),
            seller_id:sellerId,
            title:dto.title,
            description:dto.description,
            price_per_day:dto.price_per_day,
            deposit_amount:dto.deposit_amount,
            main_image:file.buffer,
            conditions:dto.conditions,
            location:dto.location,
            status:'available'
        });
        await this.itemRepo.save(item);
        return { message: 'Listing successful'};
    }

     async getProfilePic(item_id: string) {
  const user = await this.itemRepo.findOne({ where: { item_id: item_id } });
  if (!user || !user.main_image) {
    throw new NotFoundException('Profile picture not found');
  }
  return user.main_image;
}
}