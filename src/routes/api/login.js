import fs from 'fs';
import * as cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

import {  createSession, onLogin } from '$stores';
const getUsersFromApi = async (userid) => {
	let users = fs.readFileSync('C:/node/messaging-app/src/routes/api/users.json');
	let myData = JSON.parse(users);
	let data;
	if (userid) {
		data = myData.find((user) => {
			if (user.id === userid) return user;
		});
	} else {
		data = myData;
	}
		return data;
};
export const getUserByNum = async (num) => {
	let users = await getUsersFromApi();
	const existingUser = users.find((u) => u.num === num);

	if (!existingUser) return Promise.resolve(null);

	return Promise.resolve(existingUser);
};

export const registerUser = async (id, num) => {
	let user;

	try {
		let users = await getUsersFromApi();
		console.log(users);
		const existingUser = users.find((u) => u.num === num);

		user = {
			id,
			num,
			name: num
		};
		if (!!existingUser) return Promise.reject(new Error('USer already exists'));

		users.push(user);
		let resPost = await fetch('/api/getUsers', {
			method: 'POST',
			body: JSON.stringify(users),
			headers: { 'content-type': 'application/json' }
		});
	} catch (err) {
		console.log(err);
	}
	return Promise.resolve(user);
};

export const post = async ({ request }) => {
	const num = await request.text();

	const user = await getUserByNum(num);

	if (user) {
		const COOKIE_NAME = 'loggedIn';
		const secure = process.env.NODE_ENV === 'production';
		const maxAge = 10 * 365 * 24 * 60 * 60; // (3600 seconds / hour) * 200 hours
		const sameSite = 'Strict';
		const stringifiedUserData = 'true';
		return {
			headers: {
				'Set-Cookie': cookie.serialize(COOKIE_NAME, stringifiedUserData, {
					path: '/',
					httpOnly: true,
					sameSite: sameSite,
					secure: secure,
					maxAge: maxAge
				}),
				'Set-Cookie': cookie.serialize('userid', user.id, {
					path: '/',
					httpOnly: true,
					sameSite: sameSite,
					secure: secure,
					maxAge: maxAge
				})
			},
			status: 200,
			body: { message: 'Successful' }
		};
	}

	const newUser = await registerUser(uuid(), num);
	const COOKIE_NAME = 'loggedIn';
	const secure = process.env.NODE_ENV === 'production';
	const maxAge = 10 * 365 * 24 * 60 * 60; // (3600 seconds / hour) * 200 hours
	const sameSite = 'Strict';
	const stringifiedUserData = 'true';

	//onLogin();

	return {
		headers: {
			'Set-Cookie': cookie.serialize('loggedIn', 'true', {
				path: '/',
				httpOnly: true,
				sameSite: sameSite,
				secure: secure,
				maxAge: maxAge
			}),
			Cookie: cookie.serialize('userid', newUser.id, {
				path: '/',
				httpOnly: true,
				sameSite: sameSite,
				secure: secure,
				maxAge: maxAge
			})
		},
		status: 200,
		body: { message: 'Successful' }
	};
};
export const get = async (e) => {
	return {
		status: 200,
		body: e.locals
	};
};
