import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateInvoiceDto{
    @IsString()
    @IsNotEmpty()
    leaseId: string;

    @IsString()
    @IsNotEmpty()
    utilityBillId: string;
}