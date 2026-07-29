import { Controller, Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService){}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto){
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    findAll(){
        return this.paymentsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.paymentsService.findOne(id)
    }
}
