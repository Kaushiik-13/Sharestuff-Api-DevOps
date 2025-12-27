import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateRentalRequestDto {
  @ApiProperty({ example: '2025-09-25', description: 'Start date of the rental (YYYY-MM-DD)' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: '2025-09-28', description: 'End date of the rental (YYYY-MM-DD)' })
  @IsDateString()
  end_date: string;

}
