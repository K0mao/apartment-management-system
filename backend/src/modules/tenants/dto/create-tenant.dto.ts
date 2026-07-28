import { IsString, IsOptional, IsEmail, IsDateString } from "class-validator";

export class CreateTenantDto {

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  idCard?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}