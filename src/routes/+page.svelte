<script lang="ts">
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import SpeakerWaveIcon from '$lib/components/icons/SpeakerWaveIcon.svelte';
	import SixteenthNoteTile from '$lib/components/tiles/SixteenthNoteTile.svelte';
	import QuarterNoteTile from '$lib/components/tiles/QuarterNoteTile.svelte';
	import QuarterRestTile from '$lib/components/tiles/QuarterRestTile.svelte';
	import EighthNoteTile from '$lib/components/tiles/EighthNoteTile.svelte';
	import TripletTile from '$lib/components/tiles/TripletTile.svelte';
	import MediaControlsButton from '$lib/components/buttons/MediaControlsButton.svelte';
	import TempoButton from '$lib/components/buttons/TempoButton.svelte';

	let tempo = $state(100);
</script>

<main class="flex h-screen w-screen justify-center bg-purple-400">
	<div class="container flex flex-col content-center justify-center">
		<header class="flex grow-0 flex-row place-content-center justify-between">
			<div></div>
			<SpeakerWaveIcon class="size-10 text-red-200" />
		</header>

		<div class="flex h-4/5 flex-col content-center justify-center gap-4">
			<div class="grid grid-cols-4 grid-rows-1 gap-16 place-self-center">
				<QuarterNoteTile />
				<QuarterRestTile />
				<EighthNoteTile />
				<SixteenthNoteTile />
				<TripletTile />
			</div>
			<div class="mt-8 flex w-full justify-center">
				<MediaControlsButton class="size-8 text-white" />
			</div>
		</div>
		<footer class="flex grow-0 flex-row place-content-center justify-between">
			<SettingsIcon class="size-8 text-white" />
			<div class="align-center flex flex-row justify-center gap-2 text-3xl text-white">
				<div class="relative top-3 grid grid-rows-2 gap-0 leading-6">
					<span>4</span><span>4</span>
				</div>
				<TempoButton bind:tempo />
			</div>
		</footer>
	</div>
</main>
