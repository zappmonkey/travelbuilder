import {InputSimple} from "@/lib/wizard/input";
import Print from "@/components/ui/dev/print";
import {dateToHumanReadable, empty, getLocalCurrency} from "@/lib/utils/methods";

type Props = {
    input: InputSimple,
    booking: any,
    className?: string,
}

export default function Receipt(props: Props)
{
    let start = props.input.date;
    let end = props.input.date;
    let duration = props.input.duration;
    if (props.booking.order && props.booking.order.elements) {
        for (let element of props.booking.order.elements) {
            if (!empty(element.start) && element.start < start) {
                start = element.start;
            }
            if (!empty(element.end) && element.end > end) {
                end = element.end;
            }
        }
    }
    return (
        <section className="receipt text-sm text-gray-800 border-1 border-gray-200">
            <div className="flex items-center justify-between bg-nrv-light-orange border-b-1 border-dashed border-nrv-orange p-4 font-medium">
                <div>
                    Totaal prijs
                </div>
                <div className="text-nrv-orange">
                    {getLocalCurrency(props.booking.order.total)}
                </div>
            </div>
            <h3 className="text-nrv-orange font-medium p-4 -mb-5">Details</h3>
            <div className="grid grid-cols-10 gap-1 p-4 flex items-center">
                <div className="col-span-2 text-xs font-medium">
                    Vertrek
                </div>
                <div className="col-span-8 capitalize">{dateToHumanReadable(start)}</div>
                <div className="col-span-2 text-xs font-medium">
                    Terug
                </div>
                <div className="col-span-8 capitalize">{dateToHumanReadable(end)}</div>
                {props.input.adults > 0 ? <>
                    <div className="col-span-2 text-xs font-medium">
                        Volwassenen
                    </div>
                    <div className="col-span-8 capitalize">{props.input.adults}</div>
                </> : null}
                {props.input.children > 0 ? <>
                    <div className="col-span-2 text-xs font-medium">
                        Kinderen
                    </div>
                    <div className="col-span-8 capitalize">{props.input.children}</div>
                </> : null}
                {props.input.babies > 0 ? <>
                    <div className="col-span-2 text-xs font-medium">
                        Babies
                    </div>
                    <div className="col-span-8 capitalize">{props.input.babies}</div>
                </> : null}
            </div>

            <h3 className="text-nrv-orange font-medium p-4 -mb-6">Overzicht</h3>
            {props.booking.order && props.booking.order.elements ? props.booking.order.elements.map((element: any) => (
                <div key={element.id} className="grid grid-cols-10 mt-4 px-4">
                    <div className="col-span-8 text-sm capitalize">
                        {element.description}
                    </div>
                    <div className="col-span-2 text-sm text-right">
                        {empty(element.is_base) && !empty(element.total) ? getLocalCurrency(element.total) : null}
                        {!empty(element.is_base) && !empty(element.is_type) ? getLocalCurrency(props.booking.order.base.price_extra) : null}
                    </div>
                    {!empty(element.items) ? element.items.map((item: any) => (
                        <div key={item.id} className="col-span-10 text-xs grid grid-cols-10">
                            <div className="col-span-1">
                                {item.amount} x
                            </div>
                            <div className="col-span-8">
                                {item.description}
                            </div>
                            <div className="col-span-1 text-right">
                                {!empty(item.price) ? item.price : null}
                            </div>
                        </div>
                    )) : null}
                </div>
            )) : null}
            <div className="flex items-center justify-between bg-nrv-light-orange border-t-1 border-dashed border-nrv-orange p-4 font-medium mt-4">
                <div>
                    Totaal prijs
                </div>
                <div className="text-nrv-orange">
                    {getLocalCurrency(props.booking.order.total)}
                </div>
            </div>
            <Print context={props.booking}/>
        </section>
    )
}