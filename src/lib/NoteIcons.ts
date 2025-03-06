import QuarterNoteIconSVG from "./components/icons/notes/QuarterNoteIcon.svg";
import SixteenthNoteIconSVG from "./components/icons/notes/SixteenthNoteIcon.svg";
import EighthNoteIconSVG from "./components/icons/notes/EighthNoteIcon.svg";
import TripletNoteIconSVG from "./components/icons/notes/TripletNoteIcon.svg";
import QuarterRestIconSVG from "./components/icons/notes/QuarterRestIcon.svg";
import { type SVGElement } from "./CanvasRenderer";

interface BeatTile extends SVGElement {
    // tile background color
    color: string
}

const NoteIcons: Record<string, BeatTile> = {
    quarter: { src: QuarterNoteIconSVG, width: 100, height: 100, color: "oklch(0.704 0.191 22.216)" },
    sixteenth: { src: SixteenthNoteIconSVG, width: 100, height: 100, color: "oklch(0.707 0.165 254.624)" },
    triplet: { src: TripletNoteIconSVG, width: 100, height: 100, color: "oklch(0.792 0.209 151.711)" },
    eighth: { src: EighthNoteIconSVG, width: 100, height: 100, color: "oklch(0.828 0.189 84.429)" },
    quarterRest: { src: QuarterRestIconSVG, width: 100, height: 100, color: "white" },
};

export default NoteIcons;