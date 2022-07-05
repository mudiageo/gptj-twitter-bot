<script context="module">
	export async function load({ url, params, fetch, session, context }) {
		let user = await fetch('/api/getEventLocals');
		let userId = await user.text();

		let resChat = await fetch(`/api/getChatList?userid=${userId}`);

		let dataChat = await resChat.text();
		let chatList = JSON.parse(dataChat);
		return {
			props: { chatList }
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import ChatList from '$lib/chatlist/ChatList.svelte';
	export let chatList;
</script>

<div id="chat-section" class="lg:hidden border-r border-gray-300 lg:col-span-1 ">
	<ChatList chats={chatList} />
</div>
