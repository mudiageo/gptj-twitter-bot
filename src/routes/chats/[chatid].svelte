<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import MessageInputSection from '$lib/MessageInputSection.svelte';
	//import Icon from 'svelte-awesome';
	//import { beer, trash, comment, codeFork, camera, ban } from 'svelte-awesome/icons';
	import { sendMessage } from '$stores';
	import { v4 as uuid } from '@lukeed/uuid';
	import { io } from '$lib/utils/realtime';

	let selectedMessages = [];
	let unsentMessages = [];
	let prompt,
		newMessage = '';
	export let name;
	let recognition;
	export let messages = [];
	export let user;
	io.on('message', async (message) => {
		messages = [...messages, message];
	});

	let submit = () => {
		let message = {
			id: uuid(),
			message: newMessage,
			sender: user.name,
			timestamp: Date.now()
		};
		sendMessage(message, $page.params.chatid);

		newMessage = '';
	};
</script>

<div id="messages-section" class="flex h-screen flex-col lg:col-span-2 lg:block">
	<div class="h-full w-full">
		<div
			id="normal-menu"
			class="relative sticky top-0 z-30 flex items-center border-b border-gray-300 bg-white p-1"
		>
			<a sveltekit:prefetch href="/chats">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="my-1 ml-2 h-12 w-12 text-sky-100"
				>
					<path
						class="fill-current text-sky-100"
						d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
					/>
				</svg>
			</a>
			<img
				class="h-10 w-10 rounded-full object-cover"
				src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
				alt="user"
			/>
			<span class="ml-2 block font-bold text-gray-600">{name}</span>

			<span class="absolute right-0 justify-end p-3"><!--<Icon data={trash} />--></span>
		</div>
		<div
			id="selection-menu"
			class="relative sticky top-0 z-30 flex hidden h-12 items-center border-b border-sky-500 bg-sky-500 p-1 text-white"
		>
			<a> X </a>
			<span class="ml-2 block font-bold" />

			<span class="absolute right-0 justify-end p-3"><!--<Icon data={trash} />--></span>
		</div>

		<div class="relative h-full w-full overflow-y-auto p-6">
			<ul class="space-y-2">
				{#key messages}
					{#each messages as { id, message, sender, timestamp }}
						{#if sender === user.name}
							<li class="no-select flex justify-end">
								<div class="relative max-w-xl rounded px-4 py-2 text-gray-900 shadow">
									<span class="block">{message}</span>
								</div>
							</li>
						{:else}
							<li class="no-select flex justify-start">
								<div class="relative max-w-xl px-4 py-2 bg-gray-500 text-white rounded shadow">
									<span class="block">{message}</span>
								</div>
							</li>
						{/if}
					{/each}
				{/key}
			</ul>
		</div>

		<!--Message Input Section-->
		<MessageInputSection handleSubmit={submit} bind:newMessage />
	</div>
</div>

<style>
	.no-select {
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none;
		user-select: none;
	}
</style>
