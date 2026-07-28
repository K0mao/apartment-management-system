import { LeaseStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsOptional } from "class-validator";

export class UpdateLeaseDto{
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsInt()
    deposit?: number;

    @IsOptional()
    @IsInt()
    monthlyRent?: number;

    @IsOptional()
    @IsEnum(LeaseStatus)
    status?: LeaseStatus;
}