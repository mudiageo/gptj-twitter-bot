<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	let videoElement;
	const start = async () => {
		videoElement = window.getElementById('my-video-stream');
		try {
			let getScreenData = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio: true
			});
			videoElement.srcObject = getScreenData;
		} catch (e) {
			console.log(e);
		}
	};
	(async () => {})();
</script>

<button on:click={start}>stuff</button>

<video id="my-video-stream" autoplay>jgjkj</video>
