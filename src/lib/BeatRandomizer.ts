import { Beat, type Level } from "./Levels";

// a new set of random tiles should be created on each MEASURE (every 4 beats)
export default class BeatRandomizer {
    private _queue: Array<Beat> = new Array(4);
    private totalWeight: number = 0;
    private level: Level;

    constructor(level: Level) {
        this.level = level;
        this.totalWeight = this.level.weights.reduce((total, value) => value.weight + total, 0);
        this.randomize();
    }

    private getRandomBeat(): Beat {
        const random = Math.random() * this.totalWeight;

        let cursor = 0;
        for (let i = 0; i < this.level.weights.length; i++) {
            cursor += this.level.weights[i].weight;
            if (cursor >= random) {
                return this.level.weights[i].beat;
            }
        }

        return Beat.rest;
    }

    // get 4 random beats
    public randomize() {
        for(let i = 0; i < 4; i++) {
            this._queue[i] = this.getRandomBeat();
        }
    }

    get queue(): Array<Beat> {
        return this._queue;
    }
}

