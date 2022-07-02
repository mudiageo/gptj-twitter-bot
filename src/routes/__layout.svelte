<script context="module">
	export async function load({ url, params, fetch, session, context }) {
		let login = await fetch('/api/login/');
		let stuff = await login.text();
		let loggedIn = JSON.parse(stuff).loggedIn;
		//let st = Promise.resolve(loggedIn)

		let user = await fetch('/api/getEventLocals');
		let userId = await user.text();

		let resChat = await fetch(`/api/getChatList?userid=${userId}`);

		let dataChat = await resChat.text();
		let chatList = JSON.parse(dataChat);
		return {
			props: { url, loggedIn, userId, chatList }
		};
	}
</script>

<script lang="ts">
	import ChatList from '$lib/chatlist/ChatList.svelte';
	import '../app.css';
	import { isLoggedIn } from '$stores';
	import { onMount } from 'svelte';
	let login;
	let num;
	const handleSubmit = async () => {
		login = await fetch('/api/login', {
			method: 'POST',
			body: num,
			headers: { 'content-type': 'application/json' }
		});
		//window.location = '';
	};
	const toggle = () => {
		loggedIn = !loggedIn;
	};

	export let userId;
	export let loggedIn;
	export let chatList;
</script>

<button on:click={toggle}>Toggle</button>
<div class="container mx-auto">
	{#if loggedIn}
		<div class="min-w-full rounded border lg:grid lg:grid-cols-3">
			<div id="chat-section" class="hidden lg:block border-r border-gray-300 lg:col-span-1 ">

			<ChatList chats={chatList} />
</div>
			<slot />
		</div>
	{:else if login}
		{#await login}
			Logging In
		{:then}
			logged n
		{/await}
	{:else}
		<div class="hero min-h-screen bg-base-200">
			<div class="text-center hero-content">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">Messaging Application</h1>
					<p class="py-6">Please {userId} Login</p>
					<form on:submit|preventDefault={handleSubmit} method="post">
						<input type="text" name="num" bind:value={num} />
						<button type="submit">Login</button>
					</form>
					<br />
				</div>
			</div>
		</div>
	{/if}
</div>
