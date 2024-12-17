import type { User } from '@prisma/client';
import { prisma } from '.';

export async function isUsernameTaken(username: string) {
	return (await prisma.user.findUnique({ where: { username } })) !== null;
}

export async function isEmailTaken(email: string) {
	return (await prisma.user.findUnique({ where: { email } })) !== null;
}

export async function getUserByUsername(username: string) {
	return await prisma.user.findUnique({ where: { username } });
}

export async function createUser(data: Omit<User, 'id' | 'points'>) {
	return await prisma.user.create({
		data
	});
}