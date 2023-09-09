import { User } from '@prisma/client';

export type NonSensitiveUser = Pick<User, 'id' | 'name' | 'email' | 'role'>;
export type UserForAuth = Pick<User, 'id' | 'email' | 'role' | 'disabled'>;
