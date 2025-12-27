import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateRentalRequestDto {
  @ApiPropertyOptional({ example: 'paid', enum: ['pending', 'paid', 'refunded'], description: 'Update payment status' })
  @IsOptional()
  @IsEnum(['pending', 'paid', 'refunded'])
  payment_status?: 'pending' | 'paid' | 'refunded';

  @ApiPropertyOptional({ example: 'accepted', enum: ['pending', 'accepted', 'rejected', 'returned'], description: 'Update rental request status' })
  @IsOptional()
  @IsEnum(['pending', 'accepted', 'rejected', 'returned'])
  status?: 'pending' | 'accepted' | 'rejected' | 'returned';
}
