import fs from 'fs';

export const get = async (e) => {
	
	let userId = e.locals.userid;
	let chatid = e.params.chatid;

	let chat;
{
	//Get chats from json
let chats = fs.readFileSync('C:/node/messaging-app/src/routes/api/chats.json');
	let myData = JSON.parse(chats);
	
	if (chatid) {
		chat = myData.find((chat) => {
			if (chat.id === chatid) return chat;
		});
	} else {
		let error = 'Chat not found';
		return {
			status: 500,
			body: { error }
		};
	}
}

let otherUserId
	if (!chat) {
		let error = 'Chat not found';
		return {
			status: 500,
			body: { error }
		};
	} 
	else if (chat.participants.includes(userId)) {
		[otherUserId] = chat.participants
			.map((name) => {
				if (name !== userId) {
					return name;
				}
			})
			.filter(Boolean);
	} else {
		let error = 'Chat not found';
		return {
			status: 500,
			body: { error }
		};
	}

	let otherUser
	{
	//Get All users from json
let users = fs.readFileSync('C:/node/messaging-app/src/routes/api/users.json');
	let myData = JSON.parse(users);
	
	if (otherUserId) {
		otherUser = myData.find((user) => {
			if (user.id === otherUserId) return user;
		});
	} else {
		return {status:500}
	}
}

	let name = otherUser.name;
	
	

	

let messages

	{
	let messagesRaw = fs.readFileSync('C:/node/messaging-app/src/routes/api/messages.json');
	let messagesData = JSON.parse(messagesRaw);
	if (chatid) {
		messages = messagesData.find((chat) => {
			if (chat.chat_id === chatid) return chat;
		}).messages
	} 

	}

let user
{	
		let users = fs.readFileSync('C:/node/messaging-app/src/routes/api/users.json');
	let myData = JSON.parse(users);
	if (userId) {
		user = myData.find((user) => {
			if (user.id === userId) return user;
		});
	} 
}
	return {
		status: 200,
		headers: {
			accept: 'applicaton/json'
		},
		body: { messages, user, name }
	};
};
export const post = async ({ request, params }) => {
	let data = await request.text();
	let messages = fs.writeFileSync('C:/node/messaging-app/src/routes/api/chats.json', data);

	return {
		status: 200,
		body: 'done'
	};
};
