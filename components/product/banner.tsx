import InfoHover from "@/components/ui/info";
import Print from "@/components/ui/dev/print";

type Props = {
    product: any
}
export function Banner(props: Props) {
    return (
        <>
            <div aria-hidden="true" className="relative">
                <div className="relative mx-auto max-w-7xl">
                    <div className="absolute top-10 right-10 w-70 z-10 bg-nrv-orange p-4 rounded-md text-right">
                        v.a.
                        <span className="font-medium text-3xl">
                            {props.product.prices.lowest.price_per_person}
                            <InfoHover>
                                <div className="p-4">
                                    <h3 className="pb-4">Prijs p.p. is gebaseerd op</h3>
                                    <div className="flex items-center justify-between">
                                        <dt className="pr-4 text-sm text-white/50">Vertrekdatum</dt>
                                        <dd className="text-sm font-medium text-white">{props.product.prices.lowest.date}</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="pr-4 flex items-center text-sm text-white/50">Reisduur</dt>
                                        <dd className="text-sm font-medium text-white">{props.product.prices.lowest.duration + 1} dagen</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <dt className="pr-4 text-sm text-white/50">Aantal personen</dt>
                                        <dd className="font-medium text-sm text-white">{props.product.prices.lowest.adults}</dd>
                                    </div>
                                </div>
                            </InfoHover>
                        </span>

                        {props.product.tags && props.product.tags.acties.items && props.product.tags.acties.items[0].content ?
                            <div className="bg-white py-2 px-4 text-nrv-orange font-medium mt-4 rounded-md text-center">
                                <span className="uppercase">{props.product.tags.acties.items[0].content.alg.items[0].title}</span>
                                {props.product.tags.acties.items[0].content.voorw ? <InfoHover className="relative top-1">
                                    <div className="p-4 text-left">
                                        <h3 className="pb-4">{props.product.tags.acties.items[0].content.voorw.items[0].title}</h3>
                                        <p className="whitespace-pre-wrap">{props.product.tags.acties.items[0].content.voorw.items[0].description}</p>
                                    </div>
                                </InfoHover> : null}
                            </div>
                        : null}
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