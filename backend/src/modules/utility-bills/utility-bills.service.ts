import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUtilityBillDto } from './dto/create-utility-bill.dto';
import { UpdateUtilityBillDto } from './dto/update-utility-bill.dto';
@Injectable()
export class UtilityBillsService {
    constructor(private prisma : PrismaService){}

    async create(createUtilityBillDto: CreateUtilityBillDto){
        const lease = await this.prisma.lease.findUnique({
            where: {
                id: createUtilityBillDto.leaseId,
            },
        })

        if(!lease){
            throw new NotFoundException('Lease not found')
        }
        if(lease.status !== 'ACTIVE'){
            throw new BadRequestException('Lease is not active')
        }

        const existingBill = await this.prisma.utilityBill.findFirst({
            where: {
                leaseId: createUtilityBillDto.leaseId,
                month: createUtilityBillDto.month,
                year: createUtilityBillDto.year,
            }
        })
        if(existingBill){
            throw new BadRequestException('Utility bill for this month already exists')
        }

        const utilityBill = await this.prisma.utilityBill.create({
            data: {
                leaseId: createUtilityBillDto.leaseId,
                waterPrevious: createUtilityBillDto.waterPrevious,
                waterCurrent: createUtilityBillDto.waterCurrent,
                electricPrevious: createUtilityBillDto.electricPrevious,
                electricCurrent: createUtilityBillDto.electricCurrent,
                waterPrice: createUtilityBillDto.waterPrice,
                electricPrice: createUtilityBillDto.electricPrice,
                month: createUtilityBillDto.month,
                year: createUtilityBillDto.year,
            }
        })

        return {
            message: 'Utility bill created successfully',
            data : utilityBill,
        }
    }

    async findAll(){
        const utilityBills = await this.prisma.utilityBill.findMany({
            include: {
                lease:{
                    include: {
                        room: true,
                        tenant: true,
                    }
                }
            }
        })
        return {
            message: 'Get utility bills successfully',
            data: utilityBills,
        }
    }

    async findOne(id: string){
        const utilityBill = await this.prisma.utilityBill.findUnique({
            where: {
                id,
            },
            include: {
                lease:{
                    include: {
                        room: true,
                        tenant: true,
                    }
                }
            }
        })

        if(!utilityBill){
            throw new NotFoundException('Utility bill not found')
        }
        return {
            message: 'Get utility bill successfully',
            data: utilityBill,
        }
    }

    async update(id: string, upadateUtilityBillDto: UpdateUtilityBillDto){
        const utilityBill = await this.prisma.utilityBill.findUnique({
            where: {
                id,
            }
        })
        if(!utilityBill){
            throw new NotFoundException('Utility bill not found')
        }
        const updateUtilityBill = await this.prisma.utilityBill.update({
            where: {
                id,
            },
            data: {
                ...upadateUtilityBillDto,
            }
        })
        return {
            message: 'Utility bill update successfully',
            data: updateUtilityBill,
        }
    }

    async remove(id: string){
        const utilityBill = await this.prisma.utilityBill.findUnique({
            where: {
                id,
            }
        })

        if(!utilityBill){
            throw new NotFoundException('Utility bill not found')
        }

        const deletedUtilityBill = await this.prisma.utilityBill.delete({
            where: {
                id,
            }
        })

        return {
            message: 'Utility bill removed successfully',
            data: deletedUtilityBill,
        }
    }
}