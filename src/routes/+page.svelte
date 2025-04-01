<script lang="ts">
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import MediaControlsButton from '$lib/components/buttons/MediaControlsButton.svelte';
	import TempoButton from '$lib/components/buttons/TempoButton.svelte';
	import Metronome from '$lib/Metronome.svelte';
	import { onMount } from 'svelte';
	import { Rhythm } from '$lib/Metronome.svelte';
	import CanvasRenderer from '$lib/CanvasRenderer';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';
	import NoteTile from '$lib/NoteTile';
	import BeatRandomizer from '$lib/BeatRandomizer';
	import Levels from '$lib/Levels';

	let metronome: Metronome | null = $state(null);
	let canvasCtx: CanvasRenderingContext2D | null = null;
	let canvas: HTMLCanvasElement;
	let renderer: CanvasRenderer | null = null;
	let localMeasureCount = 0;
	let level = new BeatRandomizer(Levels["1"]);

	onMount(() => {
		canvasCtx = canvas.getContext('2d');

		if (!metronome) {
			metronome = new Metronome(window, draw);
			metronome.noteResolution = Rhythm.QuarterNote;
		}

		if (!renderer && canvasCtx !== null) {
			renderer = new CanvasRenderer(canvasCtx, canvas.width, canvas.height);
		}

		window.addEventListener('resize', onResizeWindow);
	});

	$effect(() => {
		// reference `currentMeasure` so that this code re-runs whenever it changes
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		metronome?.currentMeasure;
		if (metronome && metronome.isPlaying) {
			// update tiles only when the measure count increases
			// this fixes the bug where it runs twice whenever the metronome is playing
			if (metronome.currentMeasure > localMeasureCount) {
				localMeasureCount = metronome.currentMeasure;
				level.randomize();
			}
		}
	});

	function onResizeWindow() {
		if (!renderer) return;
		canvas.height = innerHeight.current! / 2;
		canvas.width = innerWidth.current!;

		renderer.width = canvas.width;
		renderer.height = canvas.height;
	}

	function draw(currentNote: number) {
		if (!canvasCtx || !renderer) return;

		let x = Math.floor(canvas.width / 8);
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		let quarterBeat = currentNote / 4;

		// draw beat tiles
		for (let i = 0; i < 4; i++) {
			if (i == quarterBeat) {
				// draw a pink box only on the quarter note
				canvasCtx.fillStyle = 'oklch(0.718 0.202 349.761)';
			} else {
				// set tile color depending on type of tile
				canvasCtx.fillStyle = NoteTile[level.queue[i]].color;
			}

			const xPos = x * (i + 1) + canvas.width / 16;
			renderer.drawSVG(NoteTile[level.queue[i]], xPos + 150 / 8, x + 150 / 6.5);
			canvasCtx.fillRect(xPos, x, 150, 150);
		}

		canvasCtx.font = '40px serif';
		canvasCtx.fillStyle = 'white';
		canvasCtx.fillText(`Current beat: ${currentNote + 1}`, 10, 50);
		canvasCtx.fillText(`Current Measure: ${metronome!.currentMeasure}`, 10, 100);
	}

	function onPause() {
		if (!metronome) return;
		metronome.play();
	}

	function onPlay() {
		if (!metronome) return;
		metronome.play();
	}
</script>

<main class="flex h-screen w-screen justify-center bg-slate-400">
	<div class="container relative flex flex-col content-center justify-center">
		<div class="flex h-4/5 flex-col content-center justify-center gap-4">
			<div class="grid grid-cols-4 grid-rows-1 gap-16 place-self-center">
				<canvas height={innerHeight.current! / 2} width={innerWidth.current!} bind:this={canvas}
				></canvas>
				<!-- <img src={QuarterNoteIconSVG} width={32} height={32}/> -->
			</div>
			<div class="mt-8 flex w-full justify-center">
				<MediaControlsButton class="size-8 text-white" {onPlay} {onPause} />
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
