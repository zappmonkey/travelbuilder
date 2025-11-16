import {defaultSession, session} from '@/lib/utils/session';
import { api_config } from '@/lib/api/api_config'
import {empty} from "@/lib/utils/methods";
import {SessionData} from "@/lib/utils/session";

class Fetcher
{
    _refreshing = false;

    async get(url: string, body?: unknown): Promise<any>
    {
        return this._fetch('GET', url, body);
    }

    async delete(url: string, body?: unknown): Promise<any>
    {
        return this._fetch('DELETE', url, body);
    }

    async post(url: string, body?: unknown): Promise<any>
    {
        return this._fetch('POST', url, body);
    }

    async put(url: string, body?: unknown): Promise<any>
    {
        return this._fetch('PUT', url, body);
    }

    async _fetch(method: string, url: string, body?: unknown, autoRefresh: boolean = true): Promise<any>
    {
        let sessionData: SessionData|undefined|null = await session().all();
        if (!await this._checkSession(sessionData)) {
            if (this._refreshing) {
                setTimeout(async () => {
                    console.log('Wait for refresh of token');
                    sessionData = await session().all();
                }, 1000);
            } else {
                await this._login()
                sessionData = await session().all();
            }
        }
        if (!sessionData) {
            sessionData = defaultSession
        }
        console.log(url, sessionData);
        // return null;

        let requestOptions = null;
        if (body && !(body instanceof FormData) && Object.keys(body).length > 0) {
            requestOptions = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionData.accessToken
                },
                body: JSON.stringify(body)
            };
        } else if (body instanceof FormData) {
            requestOptions = {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + sessionData.accessToken
                },
                body: body
            };
        } else {
            requestOptions = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionData.accessToken
                }
            };
        }
        const response = await fetch(api_config.endpoint + url, requestOptions);
        if (response.status === 401 && autoRefresh) {
            if (await this._refresh()) {
                return this._fetch(method, url, body, false);
            }
        } else if (response.status === 200) {
            return await response.json();
        }
        return null;
    }

    async _refresh(): Promise<boolean>
    {
        this._refreshing = true;
        let sessionData: SessionData|undefined|null = await session().all();
        if (!await this._checkSession(sessionData)) {
            return await this._login()
        }
        if (!sessionData) {
            sessionData = defaultSession
        }
        const response = await this._fetch('POST', 'auth/refresh_token', {
            'access_token': sessionData.accessToken,
            'refresh_token': sessionData.refreshToken,
        }, false);
        if (response) {
            sessionData.accessToken = response.access_token;
            sessionData.refreshToken = response.refresh_token;
            sessionData.expires = response.expires;
            await session().setAll(sessionData);
            this._refreshing = false;
            return true;
        }
        sessionData.accessToken = '';
        sessionData.refreshToken = '';
        sessionData.expires = 0;
        sessionData.isLoggedIn = false;
        await session().setAll(sessionData);
        this._refreshing = false;
        return false;
    }

    async _login(): Promise<boolean>
    {
        this._refreshing = true;
        const sessionData = defaultSession;
        const response = await this._fetch('POST', 'auth/token', {
            'key': api_config.key,
            'secret': api_config.secret,
        }, false);
        if (response) {
            sessionData.accessToken = response.access_token;
            sessionData.refreshToken = response.refresh_token;
            sessionData.expires = response.expires;
            await session().setAll(sessionData);
            this._refreshing = false;
            return true;
        }
        sessionData.accessToken = '';
        sessionData.refreshToken = '';
        sessionData.expires = 0;
        sessionData.isLoggedIn = false;
        await session().setAll(sessionData);
        this._refreshing = false;
        return false;
    }

    async _checkSession(sessionData: SessionData|undefined|null): Promise<boolean>
    {
        if (!sessionData) {
            return false
        }
        if (empty(sessionData.accessToken) || empty(sessionData.refreshToken)) {
            return false
        }
        return true
    }
}

export const fetcher = new Fetcher();