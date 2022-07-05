import fs from 'fs';
import * as cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
	const secure = process.env.NODE_ENV === 'production';
	const maxAge = 10 * 365 * 24 * 60 * 60; // (3600 seconds / hour) * 200 hours
	const sameSite = 'Strict';

export const post = async ({ request, locals }) => {

		return {
			headers: {
				'Set-Cookie': cookie.serialize('userid', '', {
					path: '/',
					httpOnly: true,
					sameSite: sameSite,
					secure: secure,
					maxAge: maxAge
				}),
			},
			status: 200,
			body: { message: 'Successful' }
		};


};
export const get = async (e) => {
		return {
		headers: {
			'Set-Cookie': cookie.serialize('userid', 'bsff', {
				path: '/',
				httpOnly: true,
			}),
		},
		status: 200,
		body: { message: 'Successful' }
	};
};
