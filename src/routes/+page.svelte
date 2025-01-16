<script lang="ts">
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import SpeakerWaveIcon from '$lib/components/icons/SpeakerWaveIcon.svelte';
	import metronomeClick from '$lib/assets/metronome-85688.mp3';
</script>

<main class="flex h-screen w-screen justify-center bg-red-400">
	<div class="container flex flex-col content-center justify-center">
		<header class="flex grow-0 flex-row place-content-center justify-between">
			<div></div>
			<SpeakerWaveIcon class="size-10 text-red-200" />
		</header>

		<div class="flex h-4/5 content-center justify-center">
			<div class="grid grid-cols-4 grid-rows-1 gap-16 place-self-center">
				<div class="h-32 w-32 bg-teal-400"></div>
				<div class="h-32 w-32 bg-teal-400"></div>
				<div class="h-32 w-32 bg-teal-400"></div>
				<div class="h-32 w-32 bg-teal-400"></div>
			</div>
		</div>
		<footer class="flex grow-0 flex-row place-content-center justify-between">
			<SettingsIcon class="size-10 text-white" />
			<div class="align-center flex flex-row justify-center gap-4 text-3xl text-white">
				<div class="grid grid-rows-2 gap-0 leading-6">
					<span>4</span><span>4</span>
				</div>
				<div class="self-center text-5xl underline decoration-2 underline-offset-8">123</div>
			</div>
		</footer>
	</div>
</main>
