import jwt from 'jsonwebtoken';

export default () => {
	return (
		req: {
			headers: { authorization: string };
			username: any;
			userId: any;
		},
		_: any,
		next: any
	) => {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return next('Error Authenticating');
		}

		jwt.verify(
			token,
			process.env.JwtSecret as string,
			async (err: any, decoded: any) => {
				console.log(decoded);
				if (err) return next('Unauthorized');

				req.username = decoded.username;
				req.userId = decoded.userId;

				next();
			}
		);
	};
};
