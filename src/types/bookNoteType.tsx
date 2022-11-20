export type BookNoteType = {
    id: string,
    note: string,
    color: NoteColor
}

export enum NoteColor {
    White,
    Blue
};

export const toHexadecimal = (color: NoteColor) => {
    switch (color) {
        case NoteColor.White:
            return "#ffffff";
        case NoteColor.Blue:
            return "#b4d1de"
    }
}