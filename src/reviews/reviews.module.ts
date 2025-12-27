import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Item } from 'src/entities/items.entity';
import { SellerProfile } from 'src/entities/sellers-profile.entity';
import { Review } from 'src/entities/reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, SellerProfile, Review])],
  providers: [ReviewService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
