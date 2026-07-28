import { IsString, IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateLeaseDto {
    
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  deposit: number;

  @IsInt()
  monthlyRent: number;
}
