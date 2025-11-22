type Props = {
    product: any
}
export function Banner(props: Props) {
    return (
        <>
            <div aria-hidden="true" className="relative">
                <div className="relative mx-auto max-w-7xl">
                    <div className="absolute top-10 right-10 w-40 z-10 bg-nrv-orange p-4 rounded-md">
                        v.a. <span className="font-medium text-3xl">{props.product.prices.lowest.price_per_person}</span>
                    </div>
                </div>
                <img
                    alt={props.product.group.content.meer_ban_top.items[0].images[0].name}
                    src={props.product.group.content.meer_ban_top.items[0].images[0].url}
                    className="h-84 w-full object-cover"
                />
            </div>
            <div className="  px-4 py-6 bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl ml-4 font-medium text-white sm:text-4xl">{props.product.group.name}</h1>
                            <div className="mt-2 ml-4 text-lg text-white/70">
                                {props.product.prices.lowest.duration + 1} dagen | {props.product.category.code == 'PRIVE' ? "Privéreis" :
                                    (props.product.category.code == 'GROEP' ? "Groepsreis" : (props.product.category.code == 'FAMILIE' ? "Familiereis" : props.product.category.name))}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mt-2 ml-4 text-lg font-bold rounded-sm text-white/90 bg-nrv-blue px-5 py-2">
                                Bekijk dagprogramma
                            </div>
                            <div className="mt-2 ml-4 text-lg font-bold rounded-sm text-white/90 bg-nrv-orange px-5 py-2">
                                Boek v.a. {props.product.prices.lowest.price_per_person}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}