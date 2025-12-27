import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Registered email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
