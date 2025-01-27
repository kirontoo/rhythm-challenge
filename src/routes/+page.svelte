<script lang="ts">
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import SpeakerWaveIcon from '$lib/components/icons/SpeakerWaveIcon.svelte';
	import PlayIcon from '$lib/components/icons/PlayIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import MinusIcon from '$lib/components/icons/MinusIcon.svelte';
</script>

<main class="flex h-screen w-screen justify-center bg-red-400">
	<div class="container flex flex-col content-center justify-center">
		<header class="flex grow-0 flex-row place-content-center justify-between">
			<div></div>
			<SpeakerWaveIcon class="size-10 text-red-200" />
		</header>

		<div class="flex h-4/5 flex-col content-center justify-center gap-4">
			<div class="grid grid-cols-4 grid-rows-1 gap-16 place-self-center">
				<div class="h-32 w-32 bg-teal-400"></div>
				<div class="h-32 w-32 bg-teal-400"></div>
				<div class="h-32 w-32 bg-teal-400"></div>
				<div class="h-32 w-32 bg-teal-400"></div>
			</div>
			<div class="mt-8 flex w-full justify-center">
				<PlayIcon class="size-8 place-self-center text-white" />
			</div>
		</div>
		<footer class="flex grow-0 flex-row place-content-center justify-between">
			<SettingsIcon class="size-8 text-white" />
			<div class="align-center flex flex-row justify-center gap-4 text-3xl text-white">
				<div class="grid grid-rows-2 gap-0 leading-6">
					<span>4</span><span>4</span>
				</div>
				<span class="self-center text-5xl underline decoration-2 underline-offset-8">123</span>
				<div class="align-center relative top-2 flex flex-col gap-2">
					<button class="p-0"><PlusIcon class="size-5" /></button>
					<button class="p-0"><MinusIcon class="size-5" /></button>
				</div>
			</div>
		</footer>
	</div>
</main>
