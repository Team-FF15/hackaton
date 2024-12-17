import { z } from 'zod';

export const rentSchema = z.object({
	bikeId: z.string({ required_error: 'Bike ID is required' }).trim()
});
