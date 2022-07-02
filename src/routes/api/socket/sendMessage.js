import { io } from 'socket.io-client';

export const get = async ({ request }) => {
	const URL = 'http://chatapp.com/api/socket';
	const socket = io(URL);
	socket.on('connection', (client) => {
		client.on('event', (data) => {
			console.log(data);
		});
		client.on('disconnect', () => {
			console.log('disconnect');
		});
	});

	return {
		status: 200,
		body: e.locals
	};
};
