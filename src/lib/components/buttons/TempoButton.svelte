<script lang="ts">
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import MinusIcon from '$lib/components/icons/MinusIcon.svelte';

	interface Props {
		tempo?: number;
		onIncreaseTempo?: (e: MouseEvent) => void;
		onDecreaseTempo?: (e: MouseEvent) => void;
	}

	let { tempo = $bindable(90), onIncreaseTempo, onDecreaseTempo }: Props = $props();

	function increaseTempo(event: MouseEvent) {
		tempo += 1;

		if (typeof onIncreaseTempo === 'function') {
			onIncreaseTempo(event);
		}
	}

	function decreaseTempo(event: MouseEvent) {
		tempo -= 1;
		if (typeof onDecreaseTempo === 'function') {
			onDecreaseTempo(event);
		}
	}
</script>

<div class="flex items-center gap-2">
	<input
		type="number"
		bind:value={tempo}
		class="w-fit min-w-10 max-w-20 self-center bg-transparent text-center text-5xl underline decoration-2 underline-offset-8"
	/>
	<div class="align-center relative top-2 flex flex-col gap-1">
		<button class="p-0" onclick={increaseTempo}><PlusIcon class="size-5" /></button>
		<button class="p-0" onclick={decreaseTempo}><MinusIcon class="size-5" /></button>
	</div>
</div>

<style>
	input[type='number'] {
		-moz-appearance: textfield;
		-webkit-appearance: textfield;
		appearance: textfield;
		margin: 0;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
