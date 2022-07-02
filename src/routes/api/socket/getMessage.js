import { Server } from 'socket.io';
const io = new Server(server);

export const get = async ({ request }) => {
	const io = new Server(req);
	io.on('connection', (client) => {
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
