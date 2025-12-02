import nextAppSession from '@/lib/utils/session/session';

export interface SessionData {
    wizard_input?: string;
}

export const defaultSession: SessionData = {
    wizard_input: undefined,
}

export const session = nextAppSession<SessionData>({
    name: '__zs_session__',
    secret: 'Ex84qrM93z5MzuxyNCIOYNfh3v9Yct87',
});

export async function getSession(): Promise<SessionData|null|undefined> {
    const current = session();
    return await current.all();
}

export async function storeSession(sessionData: SessionData): Promise<void> {
    const current = session();
    await current.setAll(sessionData);

}
