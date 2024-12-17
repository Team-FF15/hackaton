import { prisma } from '.';

export async function getSettings() {
    return await prisma.setting.findFirstOrThrow({
        omit: { id: true }
    });
}