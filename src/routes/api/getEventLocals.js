export const get = async (e) => {
	return {
		status: 200,
		body: e.locals.userid
	};
};
