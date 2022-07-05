import fs from 'fs';

import { v4 as uuid } from '@lukeed/uuid';

export const get = async (event) => {
	//console.log(process.cwd())
	let url = new URL(event.request.url);
	let chats = fs.readFileSync('C:/node/messaging-app/src/routes/api/chats.json');
	let myData = JSON.parse(chats);
	let chatid = url.searchParams.get('chatid');
	let data;
	if (chatid) {
		data = myData.find((chat) => {
			if (chat.id === chatid) return chat;
		});
	} else {
		data = myData;
	}
	return {
		status: 200,
		body: data
	};
};
export const post = async ({ request, params, locals }) => {
	let contactId = await request.text();
	let chatId = uuid();
	let chat = {
		id: chatId,
		type: 'individual',
		participants: [contactId, locals.userid]
	};

	let chats = fs.readFileSync('C:/node/messaging-app/src/routes/api/chats.json');
	let myData = JSON.parse(chats);

	let myChat = myData
		.map((chat) => {
			if (chat.participants.includes(locals.userid) && chat.participants.includes(contactId))
				return chat;
		})
		.filter(Boolean);

	if (myChat[0]) {
		return {
			status: 200,
			body: myChat[0].id
		};
	}

	myData.push(chat);
	let newChat = JSON.stringify(myData);
	let createChat = fs.writeFileSync('C:/node/messaging-app/src/routes/api/chats.json', newChat);

	let myMessage = fs.readFileSync('C:/node/messaging-app/src/routes/api/messages.json');
	let myMessageData = JSON.parse(myMessage);
	let message = {
		chat_id: chatId,
		messages: []
	};
	myMessageData.push(message);
	let newDatas = JSON.stringify(myMessageData);
	let messages = fs.writeFileSync('C:/node/messaging-app/src/routes/api/messages.json', newDatas);

	return {
		status: 200,
		body: chatId
	};
};
