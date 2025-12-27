import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemListingController } from "./itemListing.controller";
import { ItemListingService } from "./itemListing.service";
import { Item } from "src/entities/items.entity";
import { ItemImage } from "src/entities/item-images.entity";
import { Cart } from "src/entities/cart.entity";
import { SellerProfile } from "src/entities/sellers-profile.entity";

@Module({
 imports: [TypeOrmModule.forFeature([Item,ItemImage,SellerProfile,Cart])],
  providers: [ItemListingService],
  controllers: [ItemListingController],
})
export class itemListingModule{}