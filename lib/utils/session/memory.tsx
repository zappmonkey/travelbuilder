import { SessionData, Store } from '@/lib/utils/session/types';
import * as fs from 'fs';
import path from "node:path";

export class MemoryStore implements Store {
    store: Map<string, string> | undefined;
    _instance?: MemoryStore;

    constructor() {
        if (this._instance) {
            return this._instance;
        }
        if (typeof global !== 'undefined') {
            if ((global as any).sessionMemoryStore) {
                return (global as any).sessionMemoryStore;
            }
        }
        this.store = new Map();

        this._instance = this;
        if (typeof global !== 'undefined') {
            (global as any).sessionMemoryStore = this;
        }
        return this;
    }

    async get(sid: string): Promise<SessionData | null> {
        let sess = this.store?.get(sid);
        if (!sess && fs.existsSync(this.getFilePath(sid))) {
            sess = fs.readFileSync(this.getFilePath(sid), 'utf8');
        }
        if (sess) {
            const session = JSON.parse(sess, (key, value) => {
                if (key === 'expires') return new Date(value);
                return value;
            }) as SessionData;

            // destroy expired session
            if (
                session.cookie?.expires &&
                session.cookie.expires.getTime() <= Date.now()
            ) {
                await this.destroy(sid);
                return null;
            }
            return session;
        }
        return null;
    }

    async set(sid: string, sess: SessionData) {
        const session = JSON.stringify(sess);
        this.store?.set(sid, session);
        console.log(__dirname);
        fs.writeFileSync(this.getFilePath(sid), session);
    }

    async destroy(sid: string) {
        this.store?.delete(sid);
        fs.unlinkSync(this.getFilePath(sid));
    }

    async touch(sid: string, sess: SessionData) {
        const session = JSON.stringify(sess);
        this.store?.set(sid, session);
        fs.writeFileSync(this.getFilePath(sid), session);
    }

    getFilePath(sid: string): string {
        return process.cwd() + '/.sessions/' + sid
    }
}