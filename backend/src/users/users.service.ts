import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from '../helpers/password';
import classValidatorLikeError from '../helpers/classValidatorLikeError';
import fieldError from '../helpers/fieldError';
import { ERRORS } from '../validator.factory';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import exclude from '../helpers/exclude';

@Injectable()
export class UserService {
  public static EXCLUDE_FIELDS: (keyof CreateUserDto)[] = ['password'];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<{ password: string; email: string }, 'password' | 'email'>> {
    if (createUserDto.password !== createUserDto.repeatPassword)
      throw new HttpException(
        classValidatorLikeError(
          [fieldError('repeatPassword', [ERRORS.MISMATCH])],
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );

    const duplicate: User | null = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (duplicate)
      throw new HttpException(
        classValidatorLikeError(
          [fieldError('email', [ERRORS.ALREADY_USING])],
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );

    const { repeatPassword, ...userData } = createUserDto;
    const data = {
      ...userData,
      password: await hash(createUserDto.password),
    };

    await this.userRepository.save(data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete data.password;
    return data;
  }

  // нужен для auth/sign-in. отдает пользователя вместе с паролем
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user)
      throw new HttpException(
        classValidatorLikeError(
          [fieldError('email', [ERRORS.NOT_FOUND])],
          HttpStatus.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  async findOne(id: number) {
    return this.userRepository.findBy({ id: id });
  }
}
