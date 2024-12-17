import { loginSchema } from '@/schemas/auth.js';
import { lucia } from '@/server/auth';
import { getUserByUsername } from '@/server/db/user';
import { verify } from '@node-rs/argon2';
import { redirect } from 'sveltekit-flash-message/server';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	if (event.locals.session !== null) return redirect(302, '/');

	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await getUserByUsername(form.data.username);

		if (!user) return setError(form, 'username', 'Username or password is incorrect');

		const validPassword = await verify(user.password_hash, form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) return setError(form, 'username', 'Username or password is incorrect');

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		const message = {
			type: 'success',
			message: `Welcome back ${user.username}!`
		} as const;
		redirect('/', message, event);
	}
};
