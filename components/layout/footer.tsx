import {GenericContent, IMenuItem} from "@/interface/content";
import {objToArray} from "@/lib/utils/methods";

type Props = {
    generic: GenericContent
}

export default function Footer(props: Props) {
    return (
        <footer aria-labelledby="footer-heading" className="bg-gray-900">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="grid grid-cols-1 gap-8 xl:col-span-2">
                        <div className="space-y-12 md:grid md:grid-cols-4 md:gap-8 md:space-y-0">
                            {objToArray(props.generic.menu?.items?.menu_footer.items).map((group: IMenuItem) => (
                                <div key={group.id}>
                                    <h3 className="text-sm font-medium text-white">{group.label}</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {objToArray(group.items).map((item: IMenuItem) => (
                                            <li key={item.id} className="text-sm">
                                                <a href={item.url} className="text-gray-300 hover:text-white">
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 md:mt-16 xl:mt-0">
                        <h3 className="text-sm font-medium text-white">Schrijf je in voor onze nieuwsbrief</h3>
                        <form className="mt-6 flex sm:max-w-md">
                            <input
                                id="email-address"
                                type="text"
                                required
                                autoComplete="email"
                                aria-label="Email address"
                                className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                            />
                            <div className="ml-4 shrink-0">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-nrv-orange px-4 py-2 text-base font-medium text-white shadow-xs hover:bg-nrv-orange/90 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-hidden"
                                >
                                    Inschrijven
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 pb-5">
                    <div className="grid grid-cols-6 gap-x-2 xl:col-span-2 pt-5 pb-5">
                        {objToArray(props.generic.menu?.items?.menuonder.items).map((item: IMenuItem) => (
                            <div key={item.id}>
                                <a href={item.url} className="text-sm text-white">
                                    {item.label}
                                </a>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400">Copyright &copy; NRV - 1TIS - Alle rechten voorbehouden.</p>
                </div>
            </div>
        </footer>
    )
}