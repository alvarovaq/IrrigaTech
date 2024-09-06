import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (
        private jwtAuthService: JwtService,
        @InjectModel('users') private readonly userModel: Model<UserDocument>
    ) {}

    async login (authUserDto: AuthDto) {
        const {login, password} = authUserDto;
        const user = await this.userModel.findOne({login});
        if (!user)
            throw new NotFoundException('No se ha encontrado al usuario');
        const isMatch = await compare(password, user.password);
        if (!isMatch)
            throw new NotFoundException('Contraseña incorrecta');
        const payload = {id: user._id, login: user.login};
        const token = await this.jwtAuthService.sign(payload);
        const data = {
            user,
            token
        };
        return data;
    }

    async user (login: string) {
        const user = await this.userModel.findOne({login});
        if (!user)
            throw new NotFoundException('No se ha encontrado al usuario');
        return user;
    }

}