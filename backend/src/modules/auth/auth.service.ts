import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import {PrismaService} from "../../database/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
    async register(registerDto: RegisterDto){
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email,
            }
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
            }
        })
        const {password, ...result} = user;
        return {
            message: 'Register Success',
            data: result,
        };
    } 
    
    async login(loginDto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDto.email,
            }
        });
        if(!user){
            throw new UnauthorizedException('Invalid email or password');
        }
    
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if(!isMatch){
        throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return{
        accessToken,
    }
}
}