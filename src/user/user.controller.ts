import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() dto:userDto){
        return this.userService.createNewUser(dto)
    }
}
