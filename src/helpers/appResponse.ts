export default (prop: any) => {
	const { err, data } = prop;
	if (err) {
		return {
			err: {
				isAppError: typeof err === 'string',
				error: err,
			},
			data: undefined,
		};
	} else if (!data || data.count === 0 || data.length === 0) {
		return {
			err: {
				isAppError: true,
				error: '404 No Data Found',
			},
			data: undefined,
		};
	}
	return { err, data };
};
