import { Injectable, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SellerProfile } from '../entities/sellers-profile.entity';
import { User } from '../entities/users.entity';
import { SellerProfileBioDto } from './dto/sellerProfileBio.dto';

@Injectable()
export class SellerProfileService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(SellerProfile) private sellerprofileRepo: Repository<SellerProfile>,
  ) {}

  async createSellerProfile(userId:string,dto:SellerProfileBioDto,file: Express.Multer.File)
  {
    const user = await this.usersRepo.findOne({ where: { user_id: userId } });
    const existing = await this.sellerprofileRepo.findOne({ where: { user_id: userId } });

    if(!user && !existing) throw new NotFoundException('User not found or seller profile already exists');

    const seller = this.sellerprofileRepo.create({
        seller_id : uuidv4(),
        user_id : userId,
        bio: dto.bio,
        photo_id_type: dto.photo_id_type,
        photo_id_number: dto.photo_id_number,
        photo_id_image :file.buffer
    });
    await this.sellerprofileRepo.save(seller);
    return { message: 'Signup successful', user_id: seller.seller_id };
  }

  async getProfilePic(sellerId: string) {
  const user = await this.sellerprofileRepo.findOne({ where: { seller_id: sellerId } });
  if (!user || !user.photo_id_image) {
    throw new NotFoundException('Profile picture not found');
  }

  return user.photo_id_image;
}
}