import fs from 'fs';
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
export const post = async ({ request, params }) => {
	let data = await request.text();
	let messages = fs.writeFileSync('C:/node/messaging-app/src/routes/api/chats.json', data);

	return {
		status: 200,
		body: 'done'
	};
};
