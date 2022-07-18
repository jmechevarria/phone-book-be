import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dtos/login.dto';
import { SignupDTO } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(data: SignupDTO) {
    try {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

      return await this.prismaService.user.create({ data });
    } catch (error) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `There is a unique constraint violation, a new user cannot be created with this ${error.meta.target[0]}`,
          );
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async login(data: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new NotFoundException();

    delete user.password;

    return user;
  }
}
