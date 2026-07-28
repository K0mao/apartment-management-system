import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApartmentDto: CreateApartmentDto) {
    const apartment = await this.prisma.apartment.create({
      data: {
        name: createApartmentDto.name,
        address: createApartmentDto.address,
        phone: createApartmentDto.phone,
        description: createApartmentDto.description,
      },
    });

    return {
      message: 'Apartment created successfully',
      data: apartment,
    };
  }

  async findAll() {
    const apartments = await this.prisma.apartment.findMany();

    return {
      message: 'Get apartments successfully',
      data: apartments,
    };
  }

  async findOne(id: string) {
    const apartment = await this.prisma.apartment.findUnique({
      where: {
        id,
      },
    });

    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    return {
      message: 'Get apartment successfully',
      data: apartment,
    };
  }

  async update(id: string, updateApartmentDto: UpdateApartmentDto) {
    const apartment = await this.prisma.apartment.findUnique({
      where: {
        id,
      },
    });

    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    const updatedApartment = await this.prisma.apartment.update({
      where: {
        id,
      },
      data: updateApartmentDto,
    });

    return {
      message: 'Apartment updated successfully',
      data: updatedApartment,
    };
  }

  async remove(id: string) {
    const apartment = await this.prisma.apartment.findUnique({
      where: {
        id,
      },
    });

    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    const deletedApartment = await this.prisma.apartment.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Apartment removed successfully',
      data: deletedApartment,
    };
  }
}
