import { Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from "../../database/prisma/prisma.service";
import {CreateRoomDto} from "./dto/create-room.dto";
import { UpdateRoomDto } from './dto/update-room.dto';
@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}


    async create(createRoomDto: CreateRoomDto) {
        const apartment = await this.prisma.apartment.findUnique({
            where: {
                id: createRoomDto.apartmentId,
            }
        })
        if(!apartment){
            throw new NotFoundException('Apartment not found');
        }
    return await this.prisma.room.create({
        data: createRoomDto,
        })
    }

    async findAll(){
        return await this.prisma.room.findMany();
    }

    async findOne(id: string){
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            }
        })
    if(!room){
        throw new NotFoundException('Room not found');
    }
    return room;
    }


    async update(id: string, updateRoomDto: UpdateRoomDto){
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            }
        });
        if (!room) {
            throw new NotFoundException('Room not found');
        }
        return await this.prisma.room.update({
            where: {
                id,
            },
            data: updateRoomDto,
        });
    }

    async remove(id: string){
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            }
        })
        if(!room){
            throw new NotFoundException('Room not found');
        }
        return await this.prisma.room.delete({
            where:{
                id,
            }
        })
    }  
}