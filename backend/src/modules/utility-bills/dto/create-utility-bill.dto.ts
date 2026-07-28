import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateUtilityBillDto {
  @IsString()
  @IsNotEmpty()
  leaseId: string;

  @IsInt()
  waterPrevious: number;

  @IsInt()
  waterCurrent: number;

  @IsInt()
  electricPrevious: number;

  @IsInt()
  electricCurrent: number;

  @IsInt()
  waterPrice: number;

  @IsInt()
  electricPrice: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  year: number;
}