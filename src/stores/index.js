//import { writable } from 'svelte/stores'
import { v4 as uuid } from '@lukeed/uuid';

//const cookies = Cookie()
import { page, session } from '$app/stores';
import { io } from '$lib/utils/realtime';

let sessions = [];

export let chats = [
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387607',
		type: 'individual',
		participants: ['sdf3434t5', 'sdf3434t8']
	},
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387608',
		type: 'individual',
		participants: ['sdf3434t8', 'sdf3434t7']
	},
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387609',
		type: 'group',
		participants: ['sdf3434t7', 'sdf3434t6']
	},
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387610',
		type: 'individual',
		participants: ['sdf3434t5', 'sdf3434t6']
	}
];
export const users = [
	{
		id: 'sdf3434t5',
		num: '335335',
		name: 'Philip'
	},
	{
		id: 'sdf3434t6',
		num: '34324434',

		name: 'John'
	},
	{
		id: 'sdf3434t7',
		num: '343452434',

		name: 'Terry'
	},
	{
		id: 'sdf3434t8',
		num: '1234567',

		name: 'Mudiaga'
	}
];
export const onLogin = () => {
	return page;
};

export const getLoggedInUser = (userId) => getUser(userId);

/*
let name = chat.participants.find((name) => {
if(!name === user.name) return name


})
*/
export let isLoggedIn = async () => {
	let login = await fetch('/api/login/');
	let stuff = await login.text();
	let loggedin = JSON.parse(stuff).loggedIn;
	return loggedin;
};
export let sendMessage = async (message, chatid) => {
	if (!message) return;
	let myData;
	io.emit('message', message); // Send the message
	try {
		let res = await fetch(`/api/getMessages?chatid=${chatid}`);

		let messages = await res.text();
		myData = JSON.parse(messages);

		myData.messages.push(message);
		let resPost = await fetch('/api/getMessages', {
			method: 'POST',
			body: JSON.stringify(myData),
			headers: { 'content-type': 'application/json' }
		});
	} catch (err) {
		console.log(err);
	}
};
export let getMessagesFromApi = async () => {
	let messages;
	try {
		let res = await fetch('/api/getMessages?chatid=');

		let data = await res.text();
		messages = JSON.parse(data);
	} catch (err) {
		console.log(err);
	}
	return messages;
};
export let getMessages = (messages) => messages;

export let getAsyncMessages = async (messages) => {
	try {
		messages = await getMessagesFromApi();
	} catch (err) {
		console.log(err);
	}

	return messages;
};
