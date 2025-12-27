import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword@123', description: 'Password for the account' })
  @IsString()
  @Length(8, 64)
  password: string;
}
