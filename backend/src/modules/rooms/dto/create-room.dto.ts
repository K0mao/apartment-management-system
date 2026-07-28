import {IsInt, IsNumber, IsString} from 'class-validator';

export class CreateRoomDto{

    @IsString()
    roomNumber: string;

    @IsInt()
    floor: number;

    @IsNumber()
    monthlyRent: number;

    @IsString()
    apartmentId: string;
}