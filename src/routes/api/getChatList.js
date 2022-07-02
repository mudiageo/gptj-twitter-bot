import fs from 'fs';
export const get = async (event) => {
	//console.log(process.cwd())
	let url = new URL(event.request.url);
	let chats = fs.readFileSync('C:/node/messaging-app/src/routes/api/chats.json');
	let myData = JSON.parse(chats);
	let userId = url.searchParams.get('userid');
	let data;
	if (userId) {
		data = myData
			.map((chat) => {
				if (chat.participants.includes(userId)) {
					let [id] = chat.participants
						.map((name) => {
							if (name !== userId) return name;
						})
						.filter(Boolean);

					let users = fs.readFileSync('C:/node/messaging-app/src/routes/api/users.json');
					let myUserData = JSON.parse(users);
					let user = myUserData.find((user) => {
						if (user.id === id) return user;
					});

					let chatName = user.name;

					return { ...chat, chatName };
				}
			})
			.filter(Boolean);
	} else {
		data = null;
		return {
			status: 500,
			body: data
		};
	}
	return {
		status: 200,
		body: data
	};
};
