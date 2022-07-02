import ioClient from 'socket.io-client';
const ENDPOINT = 'http://chatapp.com:3000';
const socket = ioClient(ENDPOINT);
export const io = socket;

export const get = async ({ request }) => {
	if (res.socket.server.io) {
		console.log('Connection already running');
	} else {
		const io = new Server(res.socket.server);

		res.socket.server.io = io;
		io.on('connection', (client) => {
			socket.on('input-change', (data) => {
				console.log(data);
			});
			socket.on('disconnect', () => {
				console.log('disconnect');
			});

			socket.broadcast.emit('User connected');
		});
	}
	return {
		status: 200,
		body: e.locals
	};
};
