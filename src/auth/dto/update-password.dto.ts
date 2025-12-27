import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'StrongPassword@123', description: 'Password for the account' })
  newPassword: string;
}
