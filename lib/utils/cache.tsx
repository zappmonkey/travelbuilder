export default abstract class Cache
{
    public static get(key: string): any | null {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        return JSON.parse(item);
    }

    public static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static clear(key: string) {
        localStorage.removeItem(key);
    }

    public static clearAll(): void {
        localStorage.clear();
    }
}