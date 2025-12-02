import {defaultSession, getSession, storeSession} from "@/lib/utils/session";

export class Input {
    _type: string = 'PACKAGE';
    _id: number
    _date: string|undefined = undefined;
    _display_date: string|undefined = undefined;
    _duration: number|undefined = undefined;
    _ages: number[]|undefined = undefined;
    private _step: number = 1;

    constructor(id: number, type: string = 'PACKAGE') {
        this._id = id;
        if (!['PACKAGE', 'SUBPACKAGE', 'ELEMENT'].includes(type)) {
            console.error(`Invalid input type '${type}'`);
        }
        this._type = type;
    }

    async read()
    {
        const session = await getSession();
        if (!session || session.wizard_input === undefined) {
            return;
        }
        const input = JSON.parse(session.wizard_input);
        if (input._id !== this._id) {
            this._ages = input._ages ? input._ages : [30, 30];
        } else {
            let property: keyof typeof input;
            for (property in input) {
                // @ts-ignore
                this[property] = input[property];
            }
        }
    }

    async write()
    {
        let session = await getSession();
        if (!session) {
            session = defaultSession
        }
        session.wizard_input = JSON.stringify(this);
        return storeSession(session);
    }

    get id(): number {
        return this._id;
    }

    get date(): string | undefined {
        return this._date;
    }

    set date(value: string | undefined) {
        this._date = value;
    }

    get display_date(): string | undefined {
        return this._display_date;
    }

    set display_date(value: string | undefined) {
        this._display_date = value;
    }

    get duration(): number | undefined {
        return this._duration;
    }

    set duration(value: number | undefined) {
        this._duration = value;
    }

    get ages(): number[] {
        return this._ages == undefined ? [30, 30] : this._ages;
    }

    set ages(value: number[] | undefined) {
        this._ages = value;
    }

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        this._step = value;
    }

    simple()
    {
        let input = JSON.parse(JSON.stringify(this))
        let simple = {};
        let property: keyof typeof input;
        let new_property: string;
        for (property in input) {
            new_property = property.substring(0, 1) === '_' ? property.substring(1) : property;
            // @ts-ignore
            simple[new_property] = input[property];
        }
        return simple;
    }
}