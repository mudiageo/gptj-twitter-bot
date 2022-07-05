<script lang="ts">
	import { page } from '$app/stores';
	//	import Icon from 'svelte-awesome';
	//	import { beer, trash, comment, codeFork, camera, envelope, ban } from 'svelte-awesome/icons';
	import { goto } from '$app/navigation';

	let lastMessage = 'No recent messages';

	export let chats;
	let createChatShow;
	let contacts = [];
	const showContacts = async () => {
		createChatShow = true;
		let contactsData = await fetch('/api/getUsers');
		let contactsRaw = await contactsData.text();
		contacts = JSON.parse(contactsRaw);
		//window.location = '';
	};
	let chatId = '';
	const createChat = async (id) => {
		let res = await fetch('/api/getChats', {
			method: 'POST',
			body: id,
			headers: { 'content-type': 'application/json' }
		});
		const chatId = await res.text();

		goto(`/chats/${chatId}`);
	};
</script>

<div class="mx-3 my-3">
	<div class="relative text-gray-600">
		<span class="absolute inset-y-0 left-0 flex items-center pl-2">
			<svg
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				class="h-6 w-6 text-gray-300"
			>
				<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</span>
		<input
			type="search"
			class="block w-full rounded bg-gray-100 py-2 pl-10 outline-none"
			name="search"
			placeholder="Search"
		/>
	</div>
</div>

<ul class="overflow-auto">
	<h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
	{#if createChatShow}
		{#each contacts as contact}
			<a
				href="/chats/{chatId}"
				on:click={createChat(contact.id)}
				class="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
			>
				<img class="h-10 w-10 rounded-full object-cover" src="icon.jpg" alt="user" />
				<div class="w-full pb-2">
					<div class="flex justify-between">
						<span class="ml-2 block font-semibold text-gray-600">{contact.name}</span>
						<span class="ml-2 block text-sm text-gray-600" />
					</div>
					<span class="ml-2 block text-sm text-gray-600" />
				</div>
			</a>{/each}
	{:else}
		{#each chats as chat}
			<li>
				<a
					sveltekit:prefetch
					href="/chats/{chat.id}"
					class="flex cursor-pointer items-center border-b border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
				>
					<img class="h-10 w-10 rounded-full object-cover" src="icon.jpg" alt="user" />
					<div class="w-full pb-2">
						<div class="flex justify-between">
							<span class="ml-2 block font-semibold text-gray-600">{chat.chatName}</span>
							<span class="ml-2 block text-sm text-gray-600">6 hour</span>
						</div>
						<span class="ml-2 block text-sm text-gray-600">Last message</span>
					</div>
				</a>
			</li>
		{/each}
	{/if}
</ul>
<button
	class="inline-block p-3 bg-blue-400 text-white uppercase rounded-full shadow-md hover:bg-blue-200 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out relative bottom-5 right-5"
	on:click={showContacts}
	>en
</button>
