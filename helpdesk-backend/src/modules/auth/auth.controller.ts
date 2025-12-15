import {
  Controller,
  Get,
  Body,
  Res,
  Post,
  Req,
  HttpStatus,
  NotAcceptableException,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import type { Response } from 'express';
import { AuthService, Roles } from './auth.service';
import type { ExtendedRequest } from 'src/types/extended-request.interface';
import { UserService } from '../user/user.service';
import { UserUpdateDto } from '../user/dto';
import { menuFrames } from './data/menuFrames.data';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    if (!data.email || !data.password) {
      throw new BadRequestException(
        `Body invalido, formato esperado: JSON = {email: ?, password: ?}. dados recebido: ${JSON.stringify(data)}`,
      );
    }
    const token = await this.authService.login(data);
    res
      .cookie('token', token, this.authService.cookieOptions)
      .status(HttpStatus.ACCEPTED)
      .json({
        message:
          'Entrou na conta com sucesso, token adicionado em forma de cookie',
      });
  }

  @Get('check')
  check(@Req() req: ExtendedRequest, @Res() res: Response) {
    if (req.auth && req.user?.email && req.user?.role) {
      res.status(HttpStatus.ACCEPTED).json({
        message: `Token verificado com sucesso`,
        name: req.user?.name,
        role: req.user.role,
        email: req.user.email,
        pfp: req.user?.pfp ?? undefined,
        minutes_to_expire: (req.auth.exp - Date.now() / 1000) / 60,
        menuFrames: menuFrames[req.user.role],
      });
    } else {
      throw new NotAcceptableException(
        'Token não encontrado, redirecionando para /login',
      );
    }
  }

  @Patch('logout')
  async logout(@Req() req: ExtendedRequest, @Res() res: Response) {
    if (!req.auth) {
      throw new NotAcceptableException(
        'Token não encontrado, usuário não conectado',
      );
    } else {
      const currentTime = Math.floor(Date.now() / 1000);
      const userUpdate: UserUpdateDto = {
        id: req.user?.user_id,
        last_logout: currentTime,
      };
      await this.userService.updateUser(userUpdate);
      res.clearCookie('token').status(HttpStatus.ACCEPTED).json({
        message: `Conta desconectada de todos dispositivos com sucesso`,
      });
    }
  }
}
