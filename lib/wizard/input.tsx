import {defaultSession, getSession, storeSession} from "@/lib/utils/session";

export class Input {
    _type: string = 'PACKAGE';
    _id: number
    _date: string|undefined = undefined;
    _display_date: string|undefined = undefined;
    _duration: number|undefined = undefined;
    _ages: number[]|undefined = undefined;

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
}