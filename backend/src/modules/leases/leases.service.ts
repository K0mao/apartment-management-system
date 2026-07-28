import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { UpdateLeaseDto } from './dto/update-lease.dto';
@Injectable()
export class LeasesService {
    constructor(private readonly prisma: PrismaService){}

    async create(createLeaseDto: CreateLeaseDto){
        const room = await this.prisma.room.findUnique({
            where: {
                id: createLeaseDto.roomId
            }
        })
        if(!room){
            throw new NotFoundException('Room not found')
        }
        if(room.status !== 'AVAILABLE'){
            throw new BadRequestException('Room is not available')
        }

        const tenant = await this.prisma.tenant.findUnique({
            where: {
                id: createLeaseDto.tenantId
            }
        })
        if(!tenant){
            throw new NotFoundException('Tenant not found')
        }

        const lease = await this.prisma.lease.create({
            data: {
                roomId: createLeaseDto.roomId,
                tenantId: createLeaseDto.tenantId,
                startDate: new Date(createLeaseDto.startDate),
                endDate: new Date(createLeaseDto.endDate),
                deposit: createLeaseDto.deposit,
                monthlyRent: createLeaseDto.monthlyRent
            }
        })

        await this.prisma.room.update({
            where: {
                id: createLeaseDto.roomId
            },
            data: {
                status: 'OCCUPIED',
            }
        })
        return {
            message: 'Lease created successfully',
            data: lease,
        }
    }

    async findAll(){
        const leases = await this.prisma.lease.findMany({
            include: {
                room: true,
                tenant: true,
            }
        })

        return{
            message: 'Get leases successfully',
            data: leases,
        }
    }

    async findOne(id: string){
        const lease = await this.prisma.lease.findUnique({
            where: {
                id,
            },
            include: {
                room: true,
                tenant: true,
            }
        })

        if(!lease){
            throw new NotFoundException('Lease not found')
        }
        return{
            message: 'Get lease successfully',
            data: lease,
        }
    }

    async update(id: string, updateLeaseDto: UpdateLeaseDto){
        const lease = await this.prisma.lease.findUnique({
            where: {
                id,
            }
        })
        
        if(!lease){
            throw new NotFoundException('Lease not found')
        }
        const shouldReleaseRoom =
            lease.status !== updateLeaseDto.status &&
            (updateLeaseDto.status === 'TERMINATED' ||
            updateLeaseDto.status === 'EXPIRED');

        const updateLease = await this.prisma.lease.update({
            where: {
                id,
            },
            data: {
                ...updateLeaseDto,
                startDate: updateLeaseDto.startDate ? new Date(updateLeaseDto.startDate) : undefined,
                endDate: updateLeaseDto.endDate ? new Date(updateLeaseDto.endDate) : undefined,
            }
        })
            if(shouldReleaseRoom){
                await this.prisma.room.update({
                    where: {
                        id: lease.roomId,
                    },
                    data: {
                        status: 'AVAILABLE',
                    }
                })
            }
        return {
            message: 'Lease updated successfully',
            data: updateLease,
        }
    }
}
