import { IsEnum } from "class-validator";
import { InvoiceStatus } from "@prisma/client";

export class UpdateInvoiceDto{
    @IsEnum(InvoiceStatus)
    status: InvoiceStatus;
}