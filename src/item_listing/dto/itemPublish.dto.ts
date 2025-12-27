import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @ApiProperty({ example: 'Canon DSLR Camera', description: 'Title of the item' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'High quality DSLR camera for professional shoots', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 500.00, description: 'Price per day' })
@Type(() => Number)       // converts string to number
@IsNumber()
price_per_day: number;

@ApiProperty({ example: 1000.00, required: false })
@Type(() => Number)
@IsNumber()
@IsOptional()
deposit_amount?: number;

  @ApiProperty({ 
    example: 'like new', 
    enum: ['new', 'like new', 'good', 'used', 'old'], 
    default: 'good',
    description: 'Condition of the item'
  })
  @IsEnum(['new', 'like new', 'good', 'used', 'old'])
  conditions: string;

  @ApiProperty({ example: 'Bangalore, India', required: false, description: 'Location of the item' })
  @IsString()
  @IsOptional()
  location?: string;
}
