import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { signInDto, userDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService){}

    async createNewUser(dto:userDto){
        const role = await this.prismaService.rolePermission.findUnique({
            where: { role: dto.roleName },
        })
        if(!role){
            throw new NotFoundException(`Role ${dto.roleName} doesn't exsist`)
        }

        const user = await this.prismaService.user.findUnique({
            where: {username: dto.username}
        })
        if(user){
            throw new ConflictException("Username already taken")
        }

        const hashPassword = await bcrypt.hash(dto.password, 10);

        const newUser = await this.prismaService.user.create({
            data:{
                name: dto.name,
                username: dto.username,
                password: hashPassword,
                roleName: dto.roleName,
            },
        })

        const payload = {
            sub: newUser.id,
            username: newUser.username,
            role: newUser.roleName,
        }
        const token = await this.jwtService.signAsync(payload)

        const { password, ...result} = newUser;
        return {...result, accessToken: token};
    }

    async signIn(dto:signInDto){
        const user = await this.prismaService.user.findUnique({
            where: {username: dto.username}
        })
        
        const validPassword = user 
        ? await bcrypt.compare(dto.password, user.password) 
        : false;
        if(!validPassword || !user){
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.roleName,
        }
        const token = await this.jwtService.signAsync(payload)

        const { password, ...result} = user;
        return {...result, accessToken: token};
    }
}
