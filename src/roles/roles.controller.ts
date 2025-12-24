import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService:RolesService ){}

    @Post()
    createRole(@Body() dto: RoleDto){
        return this.rolesService.createRole(dto)
    }

    @Get()
    getAllRoles(){
        return this.rolesService.getAllRoles()
    }
}