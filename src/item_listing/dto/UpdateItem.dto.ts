import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: 'Updated Canon Camera' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Better description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 550.00 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price_per_day?: number;

  @ApiPropertyOptional({ example: 1200.00 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  deposit_amount?: number;

  @ApiPropertyOptional({ example: 'used', enum: ['new', 'like new', 'good', 'used', 'old'] })
  @IsEnum(['new', 'like new', 'good', 'used', 'old'])
  @IsOptional()
  conditions?: string;

  @ApiPropertyOptional({ example: 'Chennai, India' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 'available', enum: ['available', 'unavailable'] })
  @IsEnum(['available', 'unavailable'])
  @IsOptional()
  status?: string;
}
