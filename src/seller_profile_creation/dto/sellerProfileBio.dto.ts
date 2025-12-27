import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SellerProfileBioDto {
  @ApiProperty({ example: 'Experienced seller with a passion for sharing quality items.', description: 'Bio of the seller' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ example: 'Passport' })
  @IsString()
  @IsNotEmpty()
  photo_id_type: string;

  @ApiProperty({ example: '123-343-454-544' })
  @IsString()
  @IsNotEmpty()
  photo_id_number: string;
}