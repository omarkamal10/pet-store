export default async (db: any) => {
	await db.Category.bulkCreate([
		{
			name: 'Dog',
		},
		{
			name: 'Cat',
		},
		{
			name: 'Fish',
		},
		{
			name: 'Snake',
		},
		{
			name: 'Bird',
		},
	]);

	await db.User.bulkCreate([
		{
			username: 'user1',
			firstName: 'user1',
			lastName: 'user1',
			email: 'user1@user1.com',
			password: '$2a$10$LFi1uDsV4gRhq9IqTua0qeCsG.Id16BvYnrUyJ4LUvtIQmh4EDfEq',
			phone: '0101',
			userStatus: 0,
		},
		{
			username: 'user2',
			firstName: 'user2',
			lastName: 'user2',
			email: 'user2@user2.com',
			password: '$2a$10$LFi1uDsV4gRhq9IqTua0qeCsG.Id16BvYnrUyJ4LUvtIQmh4EDfEq',
			phone: '0101',
			userStatus: 0,
		},
		{
			username: 'user3',
			firstName: 'user3',
			lastName: 'user3',
			email: 'user3@user3.com',
			password: '$2a$10$LFi1uDsV4gRhq9IqTua0qeCsG.Id16BvYnrUyJ4LUvtIQmh4EDfEq',
			phone: '0101',
			userStatus: 0,
		},
	]);

	await db.Pet.bulkCreate([
		{
			categoryId: 1,
			name: 'doggo',
			photoUrls: ['url1', 'url2'],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			status: 'available',
			ownerId: 1,
		},
		{
			categoryId: 2,
			name: 'kitty',
			photoUrls: ['url1', 'url2'],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			status: 'available',
			ownerId: 2,
		},
		{
			categoryId: 3,
			name: 'fishy',
			photoUrls: ['url1', 'url2'],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			status: 'available',
			ownerId: 3,
		},
	]);

	await db.Auction.create({
		title: 'My pet doggo for sale',
		petId: 1,
		seller: 1,
	});
};
