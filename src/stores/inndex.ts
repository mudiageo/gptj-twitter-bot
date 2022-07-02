import { writable } from 'svelte/store';
//import Cookie from 'cookie-universal'
//const cookies = Cookie()

export let chats = writable([
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387607',
		type: 'individual',
		participants: ['sdf3434t6', 'sdf3434t8'],
		messages: [
			{
				id: 1,
				message: 'Hello',
				sender: 'Mudiaga',
				timestamp: Date.now()
			},
			{
				id: 2,
				message: 'Hello2',
				sender: 'Philip',
				timestamp: Date.now()
			},
			{
				id: 3,
				message: 'See you later',
				sender: 'Philip',
				timestamp: Date.now()
			}
		]
	},
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387608',
		type: 'individual',
		participants: ['sdf3434t8', 'sdf3434t7'],
		messages: [
			{
				id: 1,
				message: 'Hello',
				sender: 'Mudiaga',
				timestamp: Date.now()
			},
			{
				id: 2,
				message: 'Hello2',
				sender: 'Terry',
				timestamp: Date.now()
			},
			{
				id: 3,
				message: 'Who?',
				sender: 'Mudiaga',
				timestamp: Date.now()
			}
		]
	},
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387609',
		type: 'group',
		participants: ['sdf3434t7', 'sdf3434t6'],
		messages: [
			{
				id: 1,
				message: 'Hello',
				sender: 'Terry',
				timestamp: Date.now()
			},
			{
				id: 2,
				message: 'Hello2',
				sender: 'John',
				timestamp: Date.now()
			},
			{
				id: 3,
				message: 'Yeah n Candace',
				sender: 'John',
				timestamp: Date.now()
			}
		]
	},
	{
		id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387610',
		type: 'individual',
		participants: ['sdf3434t5', 'sdf3434t6'],
		messages: [
			{
				id: 1,
				message: 'Hello',
				sender: 'John',
				timestamp: Date.now()
			},
			{
				id: 2,
				message: 'Hello2',
				sender: 'Philip',
				timestamp: Date.now()
			},
			{
				id: 3,
				message: 'Hello',
				sender: 'John',
				timestamp: Date.now()
			}
		]
	}
]);
export const users = writable([
	{
		id: 'sdf3434t5',
		name: 'Philip'
	},
	{
		id: 'sdf3434t6',
		name: 'John'
	},
	{
		id: 'sdf3434t7',
		name: 'Terry'
	},
	{
		id: 'sdf3434t8',
		name: 'Mudiaga'
	}
]);

export const myUser = {
	id: 'sdf3434t8',
	name: 'Mudiaga'
};
export const getChatList = () => {
	let myChat = chats
		.map((chat) => {
			if (chat.participants.includes(myUser.id)) {
				let chatName = getChatName(chat);

				return { ...chat, chatName };
			}
		})
		.filter(Boolean);

	return myChat;
};
export const getChat = (chatid) => {
	let [chat] = chats
		.map((chat) => {
			if (chat.id === chatid) {
				return chat;
			}
		})
		.filter(Boolean);

	return chat;
};

export const getUser = (userid) => {
	let [user] = users
		.map((user) => {
			if (user.id === userid) {
				return user;
			}
		})
		.filter(Boolean);
	return user;
};

export const getChatName = (chat) => {
	let [id] = chat.participants
		.map((name) => {
			if (name !== myUser.id) return name;
		})
		.filter(Boolean);
	let name = getUser(id).name;
	return name;
};

export const getLoggedInUser = () => getUser(myUser.id);
/*
let name = chat.participants.find((name) => {
if(!name === user.name) return name


})
*/
export let messages = [
	{
		chat_id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387607',
		messages: [
			{
				id: 1,
				message: 'Hello'
			},
			{
				id: 2,
				message: 'Hello2'
			},
			{
				id: 3,
				message: 'Hello3'
			}
		]
	},
	{
		chat_id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387608',
		messages: [
			{
				id: 1,
				message: 'Hello'
			},
			{
				id: 2,
				message: 'Hello2'
			},
			{
				id: 3,
				message: 'Hello3'
			}
		]
	},
	{
		chat_id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387609',
		messages: [
			{
				id: 1,
				message: 'Hello'
			},
			{
				id: 2,
				message: 'Hello2'
			},
			{
				id: 3,
				message: 'Hello3'
			}
		]
	},
	{
		chat_id: 'c5315aa8-3a9b-4a4a-8e5f-a09832387610',
		messages: [
			{
				id: 1,
				message: 'Hello'
			},
			{
				id: 2,
				message: 'Hello2'
			},
			{
				id: 3,
				message: 'Hello3'
			}
		]
	}
];
export const isLoggedIn = async () => {
	try {
		return true;
	} catch (e) {
		console.log('Error');
	}
};
