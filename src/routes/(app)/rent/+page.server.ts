import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { rentSchema } from '@/schemas/rent';
import { newRideForUser } from '@/server/db/ride';
import { redirect } from 'sveltekit-flash-message/server';
import { decreaceUserPoints, userHaveNegativePoints } from '@/server/db/user';
import { isBikeExists } from '@/server/db/bike';

export const load = (async (event) => {
	const { user } = await event.parent();
	return {
		user
	};
}) satisfies PageServerLoad;

export const actions = {
	rent: async (event) => {
		const form = await superValidate(event, zod(rentSchema));

		if (event.locals.session === null) {
			return fail(401);
		}

		if (!form.valid) return fail(400, { form });

		if (await userHaveNegativePoints(event.locals.session.userId))
			redirect('/rent', { type: 'warning', message: 'You have negative points' }, event);

		if (!(await isBikeExists(form.data.bikeId))) {
			return setError(form, 'bikeId', 'Bike not found');
		}

		const result = await newRideForUser(event.locals.session.userId, form.data.bikeId);
		await decreaceUserPoints(event.locals.session.userId, result.totalCost);

		const message = {
			type: 'success',
			message: 'Thx for riding with us!',
			description: `Your total cost is ${result.totalCost} points.`
		} as const;

		redirect('/dashboard', message, event);
	}
};
