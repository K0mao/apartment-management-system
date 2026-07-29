import { Controller, Post, Body, Get, Param, Patch} from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dto/create-lease.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateLeaseDto } from './dto/update-lease.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Leases')
@ApiBearerAuth()
@Controller('leases')
@UseGuards(JwtAuthGuard)
export class LeasesController {
    constructor(private readonly leasesService: LeasesService){}


    @Post()
    create(@Body() createLeaseDto: CreateLeaseDto){
        return this.leasesService.create(createLeaseDto)
    }

    @Get()
    findAll(){
        return this.leasesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.leasesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateLeaseDto: UpdateLeaseDto){
        return this.leasesService.update(id, updateLeaseDto)
    }
}
