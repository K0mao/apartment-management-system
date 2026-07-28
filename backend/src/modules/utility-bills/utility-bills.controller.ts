import {Controller, Post, Body, Get, Param, Patch, Delete, UseGuards} from '@nestjs/common';
import { UtilityBillsService } from './utility-bills.service';
import { CreateUtilityBillDto } from './dto/create-utility-bill.dto';
import { UpdateUtilityBillDto } from './dto/update-utility-bill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('utility-bills')
@UseGuards(JwtAuthGuard)
export class UtilityBillsController {
    constructor(private readonly utilityBillsService: UtilityBillsService) {}

    @Post()
    create(@Body() createUtilityBillDto: CreateUtilityBillDto){
        return this.utilityBillsService.create(createUtilityBillDto)
    }

    @Get()
    findAll(){
        return this.utilityBillsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.utilityBillsService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUtilityBillDto: UpdateUtilityBillDto){
        return this.utilityBillsService.update(id, updateUtilityBillDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.utilityBillsService.remove(id)
    }
}