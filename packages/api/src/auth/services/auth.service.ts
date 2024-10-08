import type { AuthServiceContract } from '@app/auth/contracts/auth-service.contract';
import { HashServiceContract } from '@app/auth/contracts/hash-service.contract';
import { JwtServiceContract } from '@app/auth/contracts/jwt-service.contract';
import { PasswordChangeRequestRepositoryContract } from '@app/auth/contracts/password-change-request-repository.contract';
import type { JwtPayload } from '@app/auth/types/jwt-payload';
import type { EnvVariables } from '@app/shared/types';
import { createUuidV4 } from '@app/shared/utils';
import { UserRepositoryContract } from '@app/user/contracts/user-repository.contract';
import type { User } from '@app/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements AuthServiceContract {
  public constructor(
    private readonly jwtService: JwtServiceContract,
    private readonly userRepository: UserRepositoryContract,
    private readonly configService: ConfigService<EnvVariables>,
    private readonly hashService: HashServiceContract,
    private readonly passwordChangeRequestRepository: PasswordChangeRequestRepositoryContract
  ) {}

  public getUserByToken(token: string): Promise<User> {
    const { sub: uuid } = this.jwtService.decode<JwtPayload>(token);

    return this.userRepository.findUniqueOrThrow({
      where: {
        uuid,
      },
    });
  }

  public generateAuthTokens(user: User): { accessToken: string; refreshToken: string } {
    const payload: JwtPayload = {
      sub: user.uuid,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7d', secret: this.configService.get('JWT_SECRET') }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '21d', secret: this.configService.get('JWT_SECRET') }),
    };
  }

  public async createPasswordChangeRequest(args: { userId: number }): Promise<{ token: string }> {
    const token = createUuidV4();

    await this.passwordChangeRequestRepository.create({
      userId: args.userId,
      token: this.hashService.hash(token),
    });

    return { token };
  }
}
