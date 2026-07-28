import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const lease = await this.prisma.lease.findUnique({
      where: {
        id: createInvoiceDto.leaseId,
      },
    });
    if (!lease) {
      throw new NotFoundException('Lease not found');
    }

    const utilityBill = await this.prisma.utilityBill.findUnique({
      where: {
        id: createInvoiceDto.utilityBillId,
      },
    });
    if (!utilityBill) {
      throw new NotFoundException('Utility bill not found');
    }

    const existingInvoice = await this.prisma.invoice.findUnique({
      where: {
        utilityBillId: createInvoiceDto.utilityBillId,
      },
    });
    if (existingInvoice) {
      throw new BadRequestException(
        'Invoice already exists for this utility bill',
      );
    }

    const waterAmount =
      (utilityBill.waterCurrent - utilityBill.waterPrevious) *
      utilityBill.waterPrice;

    const electricAmount =
      (utilityBill.electricCurrent - utilityBill.electricPrevious) *
      utilityBill.electricPrice;

    const totalAmount = lease.monthlyRent + waterAmount + electricAmount;
    
    const  invoice = await this.prisma.invoice.create({
        data: {
            leaseId: lease.id,
            utilityBillId: utilityBill.id,

            rentAmount: lease.monthlyRent,
            waterAmount,
            electricAmount,
            totalAmount,
        }
    })
    return {
         message: 'Invoice created successfully',
         data: invoice
    }

}

async findAll(){
    const invoices = await this.prisma.invoice.findMany({
        include: {
            lease: {
                include: {
                    room: true,
                    tenant: true,
                }
            },
            utilityBill: true,
        }
    })
    return {
        message: 'Get invoices successfully',
        data: invoices,
    }
}

async findOne(id: string){
    const invoice = await this.prisma.invoice.findUnique({
        where: {
            id,
        },
        include: {
            lease: {
                include: {
                    room: true,
                    tenant: true,
                }
            },
            utilityBill: true,
        }
    })
    if(!invoice){
        throw new NotFoundException('Invoice not found')
    }

    return {
        message: 'Get invoice successfully',
        data: invoice,
    }
}

async update(id: string, updateInvoiceDto: UpdateInvoiceDto){
    const invoice = await this.prisma.invoice.findUnique({
        where: {
            id,
        }
    })

    if(!invoice){
        throw new NotFoundException('Invoice not found')
    }

    const updatedInvoice = await this.prisma.invoice.update({
        where: {
            id,
        },
        data: {
            status: updateInvoiceDto.status,
        }
    })

    return {
        message: 'Invoice updated successfully',
        data: updatedInvoice,
    }
}
}
