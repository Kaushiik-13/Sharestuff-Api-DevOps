import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Item } from 'src/entities/items.entity';
import { CreateRentalRequestDto } from './dto/CreateRentalRequest.dto';
import { UpdateRentalRequestDto } from './dto/UpdateRentalRequest.dto';
import { RentalRequest } from 'src/entities/rental-requests.entity';

@Injectable()
export class rentalRequestService {
    constructor(
        @InjectRepository(Item) private itemRepo: Repository<Item>,
        @InjectRepository(RentalRequest) private rentRepo: Repository<RentalRequest>,
    ) { }

    async createRequest(itemId: string, buyerId: string, dto: CreateRentalRequestDto) {
        const item = await this.itemRepo.findOne({ where: { item_id: itemId } });
        const exsits = await this.rentRepo.findOne({ where: { buyer_id: buyerId } })
        if (!item) throw new NotFoundException('Item not found');
        if (exsits) throw new Error("Users already requested")
        // parse dates
        const start = new Date(dto.start_date);
        const end = new Date(dto.end_date);

        if (end <= start) {
            throw new BadRequestException('End date must be after start date');
        }

        // calculate days
        const numberOfDays = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );

        // calculate total price
        const totalPrice =
            Number(item.price_per_day) * numberOfDays + Number(item.deposit_amount);


        const request = this.rentRepo.create({
            request_id: uuidv4(),
            item_id: itemId,
            buyer_id: buyerId,
            seller_id: item.seller_id,
            start_date: dto.start_date,
            end_date: dto.end_date,
            total_price: totalPrice,
            payment_status: 'pending',
            status: 'pending',
        });

        await this.rentRepo.save(request);
        return {
            message: 'Request created successfully',
            request_id: request.request_id,
            total_price: totalPrice, // now 3500
        };

    }

    async deleteRequest(requestId: string) {
        const request = await this.rentRepo.findOne({ where: { request_id: requestId } });
        if (!request) {
            throw new NotFoundException('Rental request not found');
        }

        await this.rentRepo.remove(request);
        return { message: 'Rental request deleted successfully' };
    }

    async getRequestsBySeller(sellerId: string) {
        const requests = await this.rentRepo.find({
            where: { seller_id: sellerId },
        });

        if (!requests || requests.length === 0) {
            throw new NotFoundException('No rental requests found for this seller');
        }

        return requests;
    }


    async updateRequest(
        requestId: string,
        sellerId: string,
        dto: UpdateRentalRequestDto,
    ) {
        // find request
        const request = await this.rentRepo.findOne({
            where: { request_id: requestId, seller_id: sellerId },
        });

        if (!request) {
            throw new NotFoundException(
                'Rental request not found or not owned by this seller',
            );
        }

        // update payment status if provided
        if (dto.payment_status) {
            request.payment_status = dto.payment_status;
        }

        // update status if provided
        if (dto.status) {
            request.status = dto.status;

            // condition: if seller ACCEPTS this request
            if (dto.status === 'accepted') {
                // reject all other requests for the same item_id
                await this.rentRepo
                    .createQueryBuilder()
                    .update()
                    .set({ status: 'rejected' })
                    .where('item_id = :itemId', { itemId: request.item_id })
                    .andWhere('request_id != :requestId', { requestId })
                    .andWhere('status IN (:...statuses)', { statuses: ['pending', 'accepted'] })
                    .execute();
                await this.itemRepo
                    .createQueryBuilder()
                    .update()
                    .set({ status: 'unavailable' })
                    .where('item_id = :itemId', { itemId: request.item_id })
                    .execute();
            }
        }

        await this.rentRepo.save(request);

        return {
            message: 'Rental request updated successfully',
            request_id: request.request_id,
            payment_status: request.payment_status,
            status: request.status,
        };
    }



}
