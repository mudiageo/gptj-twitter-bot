import fs from 'fs';
export const get = async (event) => {
	//console.log(process.cwd())
	let url = new URL(event.request.url);
	let messages = fs.readFileSync('C:/node/messaging-app/src/routes/api/messages.json');
	let myData = JSON.parse(messages);
	let chatid = url.searchParams.get('chatid');
	let data;
	if (chatid) {
		data = myData.find((chat) => {
			if (chat.chat_id === chatid) return chat;
		});
	} else {
		data = [];
	}

	return {
		status: 200,
		body: data
	};
};
export const post = async ({ request }) => {
	let myMessage = fs.readFileSync('C:/node/messaging-app/src/routes/api/messages.json');
	let myMessageData = JSON.parse(myMessage);

	let data = await request.text();
	let myData = JSON.parse(data);

	let newData = myMessageData.filter((chat) => {
		if (chat.chat_id !== myData.chat_id) return chat;
	});

	newData.push(myData);

	let newDatas = JSON.stringify(newData);
	let messages = fs.writeFileSync('C:/node/messaging-app/src/routes/api/messages.json', newDatas);

	return {
		status: 200,
		body: 'done'
	};
};
export const del = async ({ request }) => {
	let myMessage = fs.readFileSync('C:/node/messaging-app/src/routes/api/messages.json');
	let myMessageData = JSON.parse(myMessage);

	let data = await request.text();
	let myData = JSON.parse(data);

	let newData = myMessageData.filter((chat) => {
		if (chat.chat_id !== myData.chat_id) return chat;
	});

	newData.push(myData);

	let newDatas = JSON.stringify(newData);
	let messages = fs.writeFileSync('C:/node/messaging-app/src/routes/api/messages.json', newDatas);

	return {
		status: 200,
		body: 'done'
	};
};
