import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleDto } from './create-role.dto';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService){}

    async createRole(dto:RoleDto){
        const exsistRole = await this.prisma.rolePermission.findUnique({
            where: { role: dto.roleName },
        })
        if(exsistRole){
            throw new ConflictException(`Role: ${dto.roleName} already exsist`)
        }

        const createNewRole = await this.prisma.rolePermission.create({
            data: {
                role: dto.roleName,
                permissions: dto.permissions,
            },
        })

        return {message: 'Role created successfully',data: createNewRole,}
    }

    async getAllRoles() {
        return this.prisma.rolePermission.findMany();
    }
}
