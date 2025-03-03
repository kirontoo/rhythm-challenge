<script lang="ts">
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import MediaControlsButton from '$lib/components/buttons/MediaControlsButton.svelte';
	import TempoButton from '$lib/components/buttons/TempoButton.svelte';
	import Metronome from '$lib/metronome.svelte';
	import { onMount } from 'svelte';
	import { Rhythm } from '$lib/metronome.svelte';
	import CanvasRenderer from '$lib/CanvasRenderer';
	import QuarterNoteIconSVG from '$lib/components/icons/notes/QuarterNoteIcon.svg';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';
	let metronome: Metronome | null = null;
	let canvasCtx: CanvasRenderingContext2D | null = null;
	let canvas: HTMLCanvasElement;
	let renderer: CanvasRenderer | null = null;

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

	function onResizeWindow() {
		if (!renderer) return;
		canvas.height = innerHeight.current! / 2;
		canvas.width = innerWidth.current!;

		renderer.width = canvas.width;
		renderer.height = canvas.height;
	}

	function draw(currentNote: number) {
		if (!canvasCtx || !renderer) return;

		var x = Math.floor(canvas.width / 8);
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		let firstBeat = currentNote / 4;
		for (var i = 0; i < 4; i++) {
			if (i == firstBeat) {
				// draw a pink box only on the 1st beat of each measure
				canvasCtx.fillStyle = 'oklch(0.718 0.202 349.761)';
			} else {
				// draw teal box
				canvasCtx.fillStyle = 'oklch(0.777 0.152 181.912)';
			}

			const xPos = x * (i + 1) + canvas.width / 16;
			renderer.drawSVG(
				{ src: QuarterNoteIconSVG, width: 100, height: 100 },
				xPos + 150 / 8,
				x + 150 / 6.5
			);
			canvasCtx.fillRect(xPos, x, 150, 150);
		}
		canvasCtx.font = '40px serif';
		canvasCtx.fillStyle = 'white';
		canvasCtx.fillText(`Current beat: ${currentNote + 1}`, 10, 50);
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
