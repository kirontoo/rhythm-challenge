import QuarterNoteIconSVG from "./components/icons/notes/QuarterNoteIcon.svg";
import SixteenthNoteIconSVG from "./components/icons/notes/SixteenthNoteIcon.svg";
import EighthNoteIconSVG from "./components/icons/notes/EighthNoteIcon.svg";
import TripletNoteIconSVG from "./components/icons/notes/TripletNoteIcon.svg";
import QuarterRestIconSVG from "./components/icons/notes/QuarterRestIcon.svg";
import { type SVGElement } from "./CanvasRenderer";

const NoteIcons: Record<string, SVGElement> = {
    quarter: { src: QuarterNoteIconSVG, width: 100, height: 100 },
    sixteenth: { src: SixteenthNoteIconSVG, width: 100, height: 100 },
    triplet: { src: TripletNoteIconSVG, width: 100, height: 100 },
    eighth: { src: EighthNoteIconSVG, width: 100, height: 100 },
    quarterRest: { src: QuarterRestIconSVG, width: 100, height: 100 },
};

export default NoteIcons;