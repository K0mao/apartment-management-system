import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService){}

    async create(createPaymentDto: CreatePaymentDto){
        const invoice = await this.prisma.invoice.findUnique({
            where: {
                id: createPaymentDto.invoiceId
            }
        })
        if(!invoice){
            throw new NotFoundException('Invoice not found')
        }
        if(invoice.status === 'PAID'){
            throw new BadRequestException('Invoice already paid')
        }


        const payment = await this.prisma.payment.create({
            data: {
                invoiceId: invoice.id,
                amount: createPaymentDto.amount,
                paymentMethod: createPaymentDto.paymentMethod,
            }
        })

        await this.prisma.invoice.update({
            where: {
                id: invoice.id,
            },
            data: {
                status: 'PAID',
            }
        })

        return {
            message: 'Payment created successfully',
            data: payment,
        }

    }

    async findAll(){
        const payments = await this.prisma.payment.findMany({
            include: {
                invoice: true,
            }
        })

        return {
            message: 'Get payments successfully',
            data: payments,
        }
    }

    async findOne(id: string){
        const payment = await this.prisma.payment.findUnique({
            where: {
                id,
            },
            include: {
                invoice: true,
            }
        })
        if(!payment){
            throw  new NotFoundException('Payment not found')
        }

        return {
            message: 'Get payment successfully',
            data: payment,
        }
    }

    
}
