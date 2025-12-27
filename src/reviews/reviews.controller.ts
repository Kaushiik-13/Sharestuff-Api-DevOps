import { Controller, Post, Put, Delete, Param, Body, Req } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewService) {}

 @Post(':itemId/:reviewerId')
async createReview(
  @Param('itemId') itemId: string,
  @Param('reviewerId') reviewerId: string,
  @Body() dto: CreateReviewDto,
) {
  return this.reviewService.createReview(itemId, reviewerId, dto);
}

  @Put(':reviewId')
  @ApiBody({ type: UpdateReviewDto })
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, dto);
  }

  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }
}
