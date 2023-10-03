import { TSexSchema } from '@shared/types';
import { prisma } from '@/utils';

//! fix below... https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert / https://github.com/prisma/prisma/discussions/12219

const updateSex = async (email: string, userSex: TSexSchema): Promise<void> => {
  await prisma.user.upsert({
    where: {
      email,
    },
    create: {
      profile: {
        connectOrCreate,
      },
    },
    update: {
      profile: {
        update: {
          sex: userSex.sex,
        },
      },
    },
  });

  await prisma.profile.update({
    where: {
      id,
    },
    data: {
      sex: userSex.sex,
    },
  });
};

export const userSettingsService = { updateSex };
