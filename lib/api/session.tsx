import {empty} from "@/lib/utils/methods";
import * as fs from 'fs';
import {SessionData} from "@/lib/utils/session/types";

export interface ApiSessionData {
    accessToken?: string;
    refreshToken?: string;
    expires?: number;
}

export const defaultSession: ApiSessionData = {
    accessToken: undefined,
    refreshToken: undefined,
    expires: undefined,
}

export default function apiSession(): ApiSession
{
    return new ApiSession();
}

let session: ApiSessionData|undefined = undefined;

class ApiSession {

    constructor() {
        this.#read()
    }

    accessToken(): string|undefined
    {
        if (session === undefined) {
            return undefined;
        }
        return session.accessToken;
    }

    refreshToken(): string|undefined
    {
        if (session === undefined) {
            return undefined;
        }
        return session.refreshToken;
    }

    expires(): number|undefined
    {
        if (!session) {
            return undefined;
        }
        return session.expires;
    }

    isValid(): boolean
    {
        if (!this.#checkSession() || session === undefined) {
            return false;
        }
        if (empty(session.accessToken) || empty(session.refreshToken)) {
            return false
        }
        if (!session.expires || session.expires < Math.floor(Date.now() / 1000) - 300) {
            return false;
        }
        return true;
    }

    update(newSession: ApiSessionData): void {
        session = newSession;
        this.#write();
    }

    get(): ApiSessionData|undefined {
        return session;
    }

    #checkSession(): boolean
    {
        if (session !== undefined) {
            return true;
        }
        return this.#read();
    }

    #read(): boolean
    {
        if (session !== undefined) {
            return true;
        }
        if (fs.existsSync(this.#filePath())) {
            const sessionJson = fs.readFileSync(this.#filePath(), 'utf8');
            session = JSON.parse(sessionJson) as ApiSessionData;
            return true;
        }
        return false;
    }

    #write()
    {
        const json = JSON.stringify(session);
        fs.writeFileSync(this.#filePath(), json);
    }

    #filePath(): string {
        return process.cwd() + '/.sessions/api_session.json'
    }
}

