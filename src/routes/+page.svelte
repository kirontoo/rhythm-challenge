<script lang="ts">
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import MediaControlsButton from '$lib/components/buttons/MediaControlsButton.svelte';
	import TempoButton from '$lib/components/buttons/TempoButton.svelte';
	import Metronome from '$lib/metronome.svelte';
	import { onMount } from 'svelte';
	import { Rhythm } from '$lib/metronome.svelte';

	let metronome: Metronome | null = null;
	let canvasCtx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		canvasCtx = canvas.getContext('2d')

		if (!metronome) {
			metronome = new Metronome(window, draw);
			metronome.noteResolution = Rhythm.QuarterNote;
		}
	});

	function draw(currentNote: number) {
		var x = Math.floor( canvas.width / 8 );
		canvasCtx.clearRect(0,0,canvas.width, canvas.height); 
		let firstBeat = currentNote / 4;
		for (var i = 0; i < 4; i++) {
				if (i == firstBeat) {
					// draw a pink box only on the 1st beat of each measure
					canvasCtx.fillStyle = "oklch(0.718 0.202 349.761)";
				} else {
					// draw teal box
					canvasCtx.fillStyle = "oklch(0.777 0.152 181.912)";
				}

				canvasCtx.fillRect( x * (i+1) + (canvas.width / 16), x, 150, 150);
		}
		canvasCtx.font = "40px serif";
		canvasCtx.fillStyle = "white";
		canvasCtx.fillText(`Current beat: ${currentNote + 1}`, 10, 50);
	}

	function onPause() {
		metronome.play();
	}

	function onPlay() {
		metronome.play();
	}
</script>

<main class="flex h-screen w-screen justify-center bg-slate-400">
	<div class="container flex flex-col content-center justify-center relative">
		<div class="flex h-4/5 flex-col content-center justify-center gap-4">
			<div class="grid grid-cols-4 grid-rows-1 gap-16 place-self-center">
				<canvas height={400} width={1600} bind:this={canvas}></canvas>
			</div>
			<div class="mt-8 flex w-full justify-center">
				<MediaControlsButton class="size-8 text-white"  onPlay={onPlay} onPause={onPause}/>
			</div>
		</div>
		<footer class="flex grow-0 flex-row place-content-center justify-between">
			<SettingsIcon class="size-8 text-white" />
			<div class="align-center flex flex-row justify-center gap-2 text-3xl text-white">
				<div class="relative top-3 grid grid-rows-2 gap-0 leading-6">
					<span>4</span><span>4</span>
				</div>
				{#if metronome !== null}
				<TempoButton bind:tempo={metronome.tempo} />
				{/if}
			</div>
		</footer>
	</div>
</main>
