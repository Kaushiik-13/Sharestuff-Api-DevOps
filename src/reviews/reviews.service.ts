import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from 'src/entities/reviews.entity';
import { Item } from 'src/entities/items.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async createReview(itemId: string, reviewerId: string, dto: CreateReviewDto) {
    const item = await this.itemRepo.findOne({ where: { item_id: itemId } });
    if (!item) throw new NotFoundException('Item not found');

    const review = this.reviewRepo.create({
      review_id: uuidv4(),
      item_id: itemId,
      seller_id: item.seller_id,
      reviewer_id: reviewerId,
      ...dto,
    });

    await this.reviewRepo.save(review);
    return { message: 'Review created successfully', review_id: review.review_id };
  }

  async updateReview(reviewId: string, dto: UpdateReviewDto) {
    const review = await this.reviewRepo.findOne({ where: { review_id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');

    Object.assign(review, dto);
    await this.reviewRepo.save(review);
    return { message: 'Review updated successfully', review_id: review.review_id };
  }

  async deleteReview(reviewId: string) {
    const review = await this.reviewRepo.findOne({ where: { review_id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');

    await this.reviewRepo.remove(review);
    return { message: 'Review deleted successfully' };
  }
}
