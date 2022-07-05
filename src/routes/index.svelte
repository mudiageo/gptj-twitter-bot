<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Messaging Application</h1>
			<p class="py-6">This is a blazingly fast ðŸ”¥ and super awesome ðŸ¤© messaging app.</p>

			<br />
			Tap on a <a sveltekit:prefetch href="/chats">chat</a> to start messaging!
		</div>
	</div>
</div>
