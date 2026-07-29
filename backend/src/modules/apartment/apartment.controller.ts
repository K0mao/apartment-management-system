import { Controller, Body, Post, UseGuards, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Apartment')
@ApiBearerAuth()
@Controller('apartments')
@UseGuards(JwtAuthGuard)
export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) {}

    @Post()
    create(@Body() createApartmentDto: CreateApartmentDto) {
        return this.apartmentService.create(createApartmentDto);
    }

    @Get()
    findAll(){
        return this.apartmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.apartmentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto){
        return this.apartmentService.update(id, updateApartmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.apartmentService.remove(id);
    }
}

