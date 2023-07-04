import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role-dto';
import { BanUserDto } from './dto/ban-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    public create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    public getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдача ролей'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    public addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Бан пользователей'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    public ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
