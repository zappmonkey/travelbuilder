import { api_config } from '@/lib/api/api_config'
import apiSession, {defaultSession} from "@/lib/api/session";

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
        const session = apiSession();
        if (!session.isValid()) {
            if (this._refreshing) {
                setTimeout(async () => {
                    console.log('Waited for refresh of token');
                }, 1000);
            } else {
                await this._login()
            }
        }

        let requestOptions = null;
        if (body && !(body instanceof FormData) && Object.keys(body).length > 0) {
            requestOptions = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session.accessToken()
                },
                body: JSON.stringify(body)
            };
        } else if (body instanceof FormData) {
            requestOptions = {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + session.accessToken()
                },
                body: body
            };
        } else {
            requestOptions = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + session.accessToken()
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
        const session = apiSession();
        if (session.refreshToken() === undefined) {
            return await this._login()
        }

        const response = await this._fetch('POST', 'auth/refresh_token', {
            'access_token': session.accessToken(),
            'refresh_token': session.refreshToken(),
        }, false);
        let sessionData = defaultSession;
        if (response) {
            sessionData.accessToken = response.access_token;
            sessionData.refreshToken = response.refresh_token;
            sessionData.expires = response.expires;
            session.update(sessionData);
            this._refreshing = false;
            return true;
        }
        session.update(sessionData);
        this._refreshing = false;
        return false;
    }

    async _login(): Promise<boolean>
    {
        const session = apiSession();
        this._refreshing = true;
        const sessionData = defaultSession;
        const response = await this._fetch('POST', 'auth/token', {
            'key': api_config.key,
            'secret': api_config.secret,
        }, false);
        if (response) {
            sessionData.accessToken = response.access_token;
            sessionData.refreshToken = response.refresh_token;
            sessionData.expires = Number(response.expires);
            session.update(sessionData);
            this._refreshing = false;
            return true;
        }
        session.update(sessionData);
        this._refreshing = false;
        return false;
    }
}

export const fetcher = new Fetcher();