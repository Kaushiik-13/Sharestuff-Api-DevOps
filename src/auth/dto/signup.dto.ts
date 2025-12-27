import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '9876543210', description: 'Phone number of the user' })
  @IsString()
  @Length(10, 15)
  phone_number: string;

  @ApiProperty({ example: 'California', description: 'State where the user lives' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Los Angeles', description: 'City where the user lives' })
  @IsString()
  city: string;

  @ApiProperty({ example: '123 Main St, Apt 4B', description: 'User’s address' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword@123', description: 'Password for the account' })
  @IsString()
  @Length(8, 64)
  password: string;
}
