<script lang="ts">
	import { page } from '$app/stores';
	let lastMessage = 'No recent messages';
	export let chats;
	console.log($page.params);
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
	</ul>
