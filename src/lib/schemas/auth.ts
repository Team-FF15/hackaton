import { z } from 'zod';

const username = z
	.string({ required_error: 'Username is required' })
	.min(3, 'Username must be at least 3 characters')
	.max(20, 'Username must be at most 20 characters');
const email = z.string({ required_error: 'Email is required' }).email('Invalid email');
const password = z
	.string({ required_error: 'Password is required' })
	.min(8, 'Password must be at least 8 characters')
	.max(32, 'Password must be at most 32 characters');

export const loginSchema = z.object({
	username,
	password
});

export const registerSchema = z
	.object({
		username,
		email,
		password,
		confirmPassword: password,
		terms: z.literal(true, {
			errorMap: () => ({
				message: 'You must accept the terms and conditions'
			})
		})
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match'
			});
		}
	});
