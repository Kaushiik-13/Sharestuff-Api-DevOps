import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerProfileService } from './sellerProfile.service';
import { SellerProfileController } from './sellerProfile.controller';
import { User } from 'src/entities/users.entity';
import { SellerProfile } from '../entities/sellers-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerProfile,User])],
  providers: [SellerProfileService],
  controllers: [SellerProfileController],
})
export class SellerProfileModule {}