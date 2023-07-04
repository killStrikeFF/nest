import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Некоректный email или password' })
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        }
    }
}
