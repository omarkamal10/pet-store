const axios = require('axios');

const API = 'http://localhost:9000/api';
let token = '';
let config = {};
// Login with user2 to be able to place bid on pet and auction of user1
beforeAll(async () => {
	const response = await axios.post(`${API}/user/login`, {
		username: 'user2',
		password: '1234',
	});
	token = response.data.data.token;
	config = {
		headers: { Authorization: `Bearer ${token}` },
	};
});

describe('placing a bid', () => {
	it('user2 should place a bid on auctionId 1', async () => {
		const res = await axios.post(
			`${API}/auction/1/bid`,
			{ amount: 45 },
			config
		);
		console.log(res.data);
		expect(res.status).toEqual(200);
	});
});

describe('getting all bids placed on pet', () => {
	it('user1 logs in and gets all bids on pet', async () => {
		// Login with user1 to see all bids on pet
		const response = await axios.post(`${API}/user/login`, {
			username: 'user1',
			password: '1234',
		});
		token = response.data.data.token;
		config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const res = await axios.get(`${API}/auction/bid/pet/1`, config);
		console.log(res.data);
		expect(res.status).toEqual(200);
	});
});

describe('getting all bids in general', () => {
	it('user1 is already logged in so just check all his bids', async () => {
		const res = await axios.get(`${API}/auction/bid/pet/1`, config);
		console.log(res.data);
		expect(res.status).toEqual(200);
	});
});
