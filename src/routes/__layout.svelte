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
			props: { loggedIn, userId, chatList }
		};
	}
</script>

<script lang="ts">
	import ChatList from '$lib/chatlist/ChatList.svelte';
	import '../app.css';
	import { isLoggedIn } from '$stores';
	import { onMount } from 'svelte';
		import { goto } from '$app/navigation';

	let num, name, login;
	const handleSubmit = async () => {

	if(!name) name = num
	let payload = {
		num,
		name
	}
	login = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: { 'content-type': 'application/json' }
		});
		goto('')
	};
	
const logout = async () => {

	let	loginn = await fetch('/api/logout', {
			method: 'POST',
			body: null,
			headers: { 'content-type': 'application/json' }
		});
	//await fetch('/api/logout');
		goto('/')
	};
	const toggle = () => {
		loggedIn = !loggedIn;
	};

	export let userId;
	export let loggedIn;
	export let chatList;
</script>

<button on:click={toggle}>Toggle</button>
<button on:click={logout}>Logout</button>
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
						<span> <input type="tel" placeholder="Phone Number" bind:value={num} /></span>
						<br>
						<br>
						<span><input type="text" placeholder="Name" bind:value={name} /></span>
						<button type="submit">Login</button>
					</form>
					<br />
				</div>
			</div>
		</div>
	{/if}
</div>
