import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  last_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '9876543210', description: 'Phone number of the user' })
  phone_number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'California', description: 'State where the user lives' })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Los Angeles', description: 'City where the user lives' })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123 Main St, Apt 4B', description: 'User’s address' })
  address?: string;
}
