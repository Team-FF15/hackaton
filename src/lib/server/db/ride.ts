import { prisma } from '.';

function getRandomDateBetween10MinAnd2Hours() {
	const now = new Date();
	const minTime = 10 * 60 * 1000; // 10 minutes in milliseconds
	const maxTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

	const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
	return new Date(now.getTime() + randomTime);
}

async function calcTotalCost(startedAt: Date, endedAt: Date) {
	const settings = await prisma.setting.findFirstOrThrow({
		omit: { id: true }
	});

	const duration = endedAt.getTime() - startedAt.getTime();
	const durationInHours = duration / 1000 / 60 / 60;
	const cost = durationInHours * settings.hourlyRate + settings.bookingFee;
	return cost;
}

function getRandomDistanceBetween100mAnd2km() {
	const minDistance = 100;
	const maxDistance = 2000;

	const randomDistance = Math.random() * (maxDistance - minDistance) + minDistance;
	return randomDistance;
}

export async function newRideForUser(userId: string, bikeId: string) {
	const startedAt = new Date();
	const endedAt = getRandomDateBetween10MinAnd2Hours();
	return await prisma.ride.create({
		data: {
			userId,
			bikeId,
			startedAt,
			endedAt,
			totalCost: await calcTotalCost(startedAt, endedAt),
			distance: getRandomDistanceBetween100mAnd2km()
		}
	});
}

export async function getTotalDistanceForUser(userId: string) {
	return await prisma.ride.aggregate({
		_sum: { distance: true },
		where: { userId }
	});
}

export async function getUserRides(userId: string) {
	return await prisma.ride.findMany({
		where: { userId }
	});
}
