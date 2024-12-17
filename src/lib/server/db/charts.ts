import { prisma } from '.';

type DayData = {
	day: string;
	value: number;
	unite?: string;
};

export async function fetchChartData(userId: string) {
	const rides = await prisma.ride.findMany({
		select: {
			startedAt: true,
			distance: true,
			totalCost: true
		},
		where: {
			userId
		}
	});

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const initializeDays = (unit: string): Record<string, DayData> => {
		return daysOfWeek.reduce((acc, day) => {
			acc[day] = { day, value: 0, unite: unit };
			return acc;
		}, {} as Record<string, DayData>);
	};

	const distanceTraveled = rides.reduce((acc, ride) => {
		const day = ride.startedAt.toLocaleDateString('en-US', { weekday: 'long' });
		acc[day].value += ride.distance;
		return acc;
	}, initializeDays('m'));

	const usageCost = rides.reduce((acc, ride) => {
		const day = ride.startedAt.toLocaleDateString('en-US', { weekday: 'long' });
		acc[day].value += ride.totalCost;
		return acc;
	}, initializeDays('points'));

	const carbonFootprint = rides.reduce((acc, ride) => {
		const day = ride.startedAt.toLocaleDateString('en-US', { weekday: 'long' });
		acc[day].value += ride.distance * 0.21;
		return acc;
	}, initializeDays('Kg'));

	return {
		distanceTraveled: Object.values(distanceTraveled) as DayData[],
		usageCost: Object.values(usageCost) as DayData[],
		carbonFootprint: Object.values(carbonFootprint) as DayData[]
	};
}
