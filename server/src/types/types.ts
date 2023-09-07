import { User } from '@prisma/client';

export type NonSensitiveUser = Pick<User, 'id' | 'name' | 'email' | 'role'>;
