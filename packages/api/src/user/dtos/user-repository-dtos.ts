import type { AtLeastOne } from '@app/shared/types';

export interface UserRepositoryCreateInput {
  uuid: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatarId?: number | null;
}

export interface UserRepositoryUpdateInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
    email: string;
    username: string;
  }>;
  data: Partial<{
    name: string;
    email: string;
    password: string;
    avatarId?: number | null;
    emailVerifiedAt?: Date | null;
  }>;
}

export interface UserRepositoryFindUniqueOrThrowInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
    email: string;
    username: string;
  }>;
}
