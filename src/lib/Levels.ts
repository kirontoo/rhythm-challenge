export interface Level {
    minMeasure: number;
    maxMeasure: number;
    weights: Array<Weight>
};

export enum Beat {
    quarter = "quarter",
    eighth = "eighth",
    sixteenth = "sixteenth",
    triplet = "triplet",
    rest = "rest"
};

export interface Weight {
    beat: Beat,
    weight: number
};

const Levels: Record<number, Level> = {
    1: {
        minMeasure: 0,
        maxMeasure: 5,
        weights: [
            {
                beat: Beat.quarter,
                weight: 70
            },
            {
                beat: Beat.eighth,
                weight: 0
            },
            {
                beat: Beat.sixteenth,
                weight: 0
            },
            {
                beat: Beat.triplet,
                weight: 0
            },
            {
                beat: Beat.rest,
                weight: 40
            },
        ]
    },
    2: {
        minMeasure: 6,
        maxMeasure: 10,
        weights: [
            {
                beat: Beat.quarter,
                weight: 50
            },
            {
                beat: Beat.eighth,
                weight: 60
            },
            {
                beat: Beat.sixteenth,
                weight: 0
            },
            {
                beat: Beat.triplet,
                weight: 0
            },
            {
                beat: Beat.rest,
                weight: 50
            },
        ]
    },
    3: {
        minMeasure: 11,
        maxMeasure: 15,
        weights: [
            {
                beat: Beat.quarter,
                weight: 40
            },
            {
                beat: Beat.eighth,
                weight: 60
            },
            {
                beat: Beat.sixteenth,
                weight: 0
            },
            {
                beat: Beat.triplet,
                weight: 0
            },
            {
                beat: Beat.rest,
                weight: 35
            },
        ]
    },
    4: {
        minMeasure: 16,
        maxMeasure: 20,
        weights: [
            {
                beat: Beat.quarter,
                weight: 30
            },
            {
                beat: Beat.eighth,
                weight: 50
            },
            {
                beat: Beat.sixteenth,
                weight: 0
            },
            {
                beat: Beat.triplet,
                weight: 50
            },
            {
                beat: Beat.rest,
                weight: 30
            },
        ]
    },
    5: {
        minMeasure: 21,
        maxMeasure: 30,
        weights: [
            {
                beat: Beat.quarter,
                weight: 20
            },
            {
                beat: Beat.eighth,
                weight: 40
            },
            {
                beat: Beat.sixteenth,
                weight: 60
            },
            {
                beat: Beat.triplet,
                weight: 50
            },
            {
                beat: Beat.rest,
                weight: 40
            },
        ]
    }
};

export default Levels;
