interface Choice {
    key: string
    amount: number
}

interface Selection {
    group_id: number;
    choices: Choice[];
}

interface ElementSelection {
    id: number,
    selections: Selection[],
}

interface Group {
    id: number,
    date: string|undefined,
    duration: number|undefined,
    participants: number[],
    elements: ElementSelection[],
}