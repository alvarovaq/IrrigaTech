import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post('login')
    async login (@Body() authDto: AuthDto) {
        return await this.authService.login(authDto);
    }

    @Get('user/:login')
    async user (@Param('login') login: string) {
        return await this.authService.user(login);
    }

}