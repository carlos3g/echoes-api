import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import { prismaUserToUserAdapter } from '@app/user/adapters';
import type { PrismaUserRepositoryContract } from '@app/user/contracts/user-repository.contract';
import type {
  UserRepositoryCreateInput,
  UserRepositoryFindUniqueOrThrowInput,
  UserRepositoryUpdateInput,
} from '@app/user/dtos/user-repository-dtos';
import type { User } from '@app/user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements PrismaUserRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: UserRepositoryFindUniqueOrThrowInput) {
    const entity = await this.prismaManager.getClient().user.findUniqueOrThrow({
      where: input.where,
    });

    return prismaUserToUserAdapter(entity);
  }

  public async create(input: UserRepositoryCreateInput): Promise<User> {
    const entity = await this.prismaManager.getClient().user.create({
      data: {
        ...input,
      },
    });

    return prismaUserToUserAdapter(entity);
  }

  public async update(input: UserRepositoryUpdateInput): Promise<User> {
    const entity = await this.prismaManager.getClient().user.update({
      where: input.where,
      data: input.data,
    });

    return prismaUserToUserAdapter(entity);
  }
}
