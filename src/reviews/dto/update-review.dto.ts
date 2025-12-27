import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @ApiPropertyOptional({ 
    example: 4, 
    description: 'Updated rating for the item (1 to 5)' 
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ 
    example: 'Changed my mind, works great!', 
    description: 'Optional updated comment about the item' 
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
