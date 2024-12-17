import { PrismaClient, Status } from '@prisma/client';
import bikes from './bikes.json'; // Import the bikes data from JSON
import { faker } from '@faker-js/faker';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

async function main() {
	// Seed Users
	const users = await Promise.all(
		Array.from({ length: 10 }).map(async () => {
			const passwordHash = await hash(faker.internet.password(), {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});
			return await prisma.user.create({
				data: {
					username: faker.internet.username(),
					email: faker.internet.email(),
					password_hash: passwordHash,
					points: faker.number.int({ min: 0, max: 1000 })
				}
			});
		})
	);

	// Seed Bikes from JSON
	await Promise.all(
		bikes.map((bike) => {
			return prisma.bike.create({
				data: {
					id: bike.id,
					longitude: bike.longitude,
					latitude: bike.latitude,
					status: bike.status as Status
				}
			});
		})
	);

	// Seed Rides
	await Promise.all(
		users.map((user) => {
			return prisma.ride.create({
				data: {
					userId: user.id,
					bikeId: faker.helpers.arrayElement(bikes).id,
					startedAt: faker.date.past(),
					endedAt: faker.date.recent(),
					distance: faker.number.float({ min: 0, max: 100 }),
					totalCost: faker.number.float({ min: 0, max: 100 })
				}
			});
		})
	);

	// Seed Settings
	await prisma.setting.create({
		data: {
			bookingFee: 5.0,
			hourlyRate: 20.0,
			damageReportFee: 50.0,
			pointValue: 0.1
		}
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
