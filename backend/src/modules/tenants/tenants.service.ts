import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateTenantDto } from './dto/update-tenant.dto';
@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(createTenantDto: CreateTenantDto) {
    const tenant = await this.prisma.tenant.create({
      data: {
        firstName: createTenantDto.firstName,
        lastName: createTenantDto.lastName,
        phone: createTenantDto.phone,
        email: createTenantDto.email,
        idCard: createTenantDto.idCard,
        birthDate: createTenantDto.birthDate 
        ? new Date(createTenantDto.birthDate)
        : null,
      }
    });

    return {
      message: 'Tenant created successfully',
      data: tenant,
    };
  }

  async findAll() {
    const tenants = await this.prisma.tenant.findMany();

    return {
      message: 'Get Tenants successfully',
      data: tenants,
    };
  }

  async findOne(id: string) {
  const tenant = await this.prisma.tenant.findUnique({
    where: {
      id,
    },
  });

  if (!tenant) {
    throw new NotFoundException('Tenant not found');
  }

  return {
    message: 'Get tenant successfully',
    data: tenant,
  };
}

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
    });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    const updatedTenant = await this.prisma.tenant.update({
      where: {
        id,
      },
      data: {
        ...updateTenantDto,
            birthDate: updateTenantDto.birthDate
                ? new Date(updateTenantDto.birthDate)
                : undefined,
      }
    });

    return {
      message: 'Tenant updated successfully',
      data: updatedTenant,
    };
  }

  async remove(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const deletedTenant = await this.prisma.tenant.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Tenant removed successfully',
      data: deletedTenant,
    };
  }
}
