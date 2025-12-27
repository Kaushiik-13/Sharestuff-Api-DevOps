import { Controller, Post, Body, Request, UseGuards, BadRequestException, Param, UploadedFile, UseInterceptors, Res, NotFoundException, Get, Delete, Put,Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { rentalRequestService } from './rentalRequest.service';
import { UpdateRentalRequestDto } from './dto/UpdateRentalRequest.dto';
import { CreateRentalRequestDto } from './dto/CreateRentalRequest.dto';
@ApiTags('Rental Request')
@Controller('rental-request')
export class rentalRequestController {
    constructor(private readonly rentalRequestService: rentalRequestService) { }

    @Post(':itemId/:buyerId')
    async createRequestRental(
        @Param('itemId') itemId: string,
        @Param('buyerId') buyerId: string,
        @Body() dto: CreateRentalRequestDto
    ) {
        return this.rentalRequestService.createRequest(itemId, buyerId, dto)
    }

    @Delete('requestItem/:id')
    async deleteRentalRequest(@Param('id') requestId: string) {
        return await this.rentalRequestService.deleteRequest(requestId);
    }
    @Get('requestItem-seller/:sellerId')
    async getRequestsBySeller(@Param('sellerId') sellerId: string) {
        return await this.rentalRequestService.getRequestsBySeller(sellerId);
    }
    @Patch(':requestId/seller/:sellerId')
    async updateRentalRequest(
        @Param('requestId') requestId: string,
        @Param('sellerId') sellerId: string,
        @Body() dto: UpdateRentalRequestDto,
    ) {
        return await this.rentalRequestService.updateRequest(requestId, sellerId, dto);
    }

}