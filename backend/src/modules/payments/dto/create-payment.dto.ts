import {PaymentMethod} from '@prisma/client'
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class CreatePaymentDto{
    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    @IsInt()
    @Min(1)
    amount: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}