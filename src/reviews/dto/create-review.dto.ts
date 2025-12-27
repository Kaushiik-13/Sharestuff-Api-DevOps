import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ 
    example: 5, 
    description: 'Rating given to the item (1 to 5)' 
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ 
    example: 'Great product, worked perfectly for my shoot!', 
    description: 'Optional comment about the item', 
    required: false 
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
