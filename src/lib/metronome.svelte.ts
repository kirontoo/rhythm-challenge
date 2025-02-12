interface Note {
	note: number, // beat number
	time: number  // time to play
}

export enum Rhythm {
	SixteenthNote = 16,
	EigthNote = 8,
	QuarterNote = 4
}

class Metronome {

	// Are we currently playing?
	isPlaying = false;
	// tempo (in beats per minute)
	tempo: number = $state(120.0);

	// 0 == 16th, 1 == 8th, 2 == quarter note
	noteResolution: Rhythm = Rhythm.SixteenthNote;

	public draw: (currentNote: number) => void;

	private window: Window | null = null;

	private audioContext: AudioContext = new AudioContext();

	private unlockedAudio: boolean = false;

	// What note is currently last scheduled?
	private current16thNote: number = 0;

	// How frequently to call scheduling function 
	// (in milliseconds)
	private lookahead: number = 25.0;

	// How far ahead to schedule audio (sec)
	// This is calculated from lookahead, and overlaps 
	// with next interval (in case the timer is late)
	private scheduleAheadTime: number = 0.1;

	// when the next note is due.
	private nextNoteTime: number = 0.0;

	// length of "beep" (in seconds)
	private noteLength: number = 0.05;


	// the last "box" we drew on the screen
	private last16thNoteDrawn: number = -1;

	// the notes that have been put into the web audio,
	// and may or may not have played yet. {note, time}
	private notesInQueue: Note[] = [];

	// The Web Worker used to fire timer messages
	private timerWorker = new Worker(new URL('./worker.js', import.meta.url));

	constructor(window: Window, draw: (currentNote: number) => void) {
		this.window = window;
		this.draw = draw;

		this.tick = this.tick.bind(this);

		this.window.requestAnimationFrame(this.tick);
		this.timerWorker.addEventListener("message", this.onWorkerMessage.bind(this));
		this.timerWorker.postMessage({ interval: this.lookahead });
	}

	private onWorkerMessage(e: MessageEvent) {
		if (e.data == 'tick') {
			this.scheduler();
		} else {
			console.log('message: ' + e.data);
		}
	}

	private scheduler() {
		// while there are notes that will need to play before the next interval, 
		// schedule them and advance the pointer.
		while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
			this.scheduleNote(this.current16thNote, this.nextNoteTime);
			this.nextNote();
		}
	}

	private scheduleNote(beatNumber: number, time: number) {
		// push the note on the queue, even if we're not playing.
		this.notesInQueue.push({ note: beatNumber, time: time });

		if ((this.noteResolution == Rhythm.EigthNote) && (beatNumber % 2)) {
			// we're not playing non-8th 16th notes
			return;
		}

		if ((this.noteResolution == Rhythm.QuarterNote) && (beatNumber % 4)) {
			// we're not playing non-quarter 8th notes
			return;
		}

		// create an oscillator
		const osc = this.audioContext.createOscillator();
		osc.connect(this.audioContext.destination);

		if (beatNumber % Rhythm.SixteenthNote === 0) {
			// beat 0 == high pitch
			osc.frequency.value = 880.0;
		} else if (beatNumber % 4 === 0) {
			// quarter notes = medium pitch
			osc.frequency.value = 440.0;
		} else {
			// other 16th notes = low pitch
			osc.frequency.value = 220.0;
		}

		osc.start(time);
		osc.stop(time + this.noteLength);
	}

	private nextNote() {
		// Advance current note and time by a 16th note...
		// Notice this picks up the CURRENT 
		// tempo value to calculate beat length.
		const secondsPerBeat = 60.0 / this.tempo;

		// Add beat length to last beat time
		this.nextNoteTime += 0.25 * secondsPerBeat;

		// Advance the beat number, wrap to zero
		this.current16thNote++;
		if (this.current16thNote == Rhythm.SixteenthNote) {
			this.current16thNote = 0;
		}
	}

	private tick() {
		let currentNote = this.last16thNoteDrawn;
		if (this.audioContext) {
			const currentTime = this.audioContext.currentTime;

			while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
				currentNote = this.notesInQueue[0].note;
				this.notesInQueue.splice(0, 1);   // remove note from queue
			}

			// We only need to draw if the note has moved.
			if (this.last16thNoteDrawn != currentNote) {
				this.draw(currentNote);
				this.last16thNoteDrawn = currentNote;
			}
		}
		// set up to draw again
		if (this.window) {
			this.window.requestAnimationFrame(this.tick);
		}
	}

	play() {

		if (!this.unlockedAudio) {
			// play silent buffer to unlock the audio
			const buffer = this.audioContext.createBuffer(1, 1, 22050);
			const node = this.audioContext.createBufferSource();
			node.buffer = buffer;
			node.start(0);
			this.unlockedAudio = true;
		}

		this.isPlaying = !this.isPlaying;

		if (this.isPlaying) { // start playing
			this.current16thNote = 0;
			this.nextNoteTime = this.audioContext.currentTime;
			this.timerWorker.postMessage("start");
			return "stop";
		} else {
			this.timerWorker.postMessage("stop");
			return "play";
		}
	}

};




export default Metronome;
