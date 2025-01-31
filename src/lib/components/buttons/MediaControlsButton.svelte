<script lang="ts">
	import PauseIcon from '../icons/PauseIcon.svelte';
	import PlayIcon from '../icons/PlayIcon.svelte';
	import type { SVGAttributes } from 'svelte/elements';

	interface Props extends SVGAttributes<SVGSVGElement> {
		onPause?: () => void;
		onPlay?: () => void;
		isPaused?: boolean;
	}

	let { isPaused = $bindable(false), onPause, onPlay, ...restProps }: Props = $props();

	function onKeyDown(e: KeyboardEvent) {
		switch (e.code) {
			case 'Space':
				toggleMediaButton();
				break;
			default:
				break;
		}
	}

	function toggleMediaButton() {
		isPaused = !isPaused;
		if (isPaused && typeof onPause === 'function') {
			onPause();
		} else {
			if (typeof onPlay === 'function') {
				onPlay();
			}
		}
	}
</script>

<button onclick={toggleMediaButton} class=" p-1 transition duration-100 hover:drop-shadow-2xl">
	{#if isPaused}
		<PlayIcon class={restProps.class || ''} />
	{:else}
		<PauseIcon class={restProps.class || ''} />
	{/if}
</button>

<svelte:window on:keydown|preventDefault={onKeyDown} />
