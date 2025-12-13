import {SimpleInput} from "@/lib/wizard/input";
import Print from "@/components/ui/dev/print";
import {classNames, dateTimeToHumanReadable, dateToHumanReadable, empty, getLocalCurrency} from "@/lib/utils/methods";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import WizardHandler from "@/lib/wizard/handler";

type Props = {
    handler: WizardHandler,
    input: SimpleInput,
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
    let transportShown: string[] = [];
    return (
        <>
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
                {!empty(props.booking.order.transportation) ?
                    <div className="grid grid-cols-10 gap-1 p-4 flex items-center">
                    <h3 className="text-nrv-orange font-medium col-span-10">Vervoer</h3>
                    {props.booking.order.transportation.map((line: any, index: number) => (
                        line.type == 'AUTOHUUR' ? <div key={index} className="grid grid-cols-10 gap-1 col-span-10 items-center justify-center text-xs">
                            {!transportShown.includes(line.type) && transportShown.push(line.type) ? <h4 className="col-span-10 font-medium mt-2 text-xs">Huurauto</h4> : null}
                            <div className="col-span-2">
                                Ophalen
                            </div>
                            <div className="col-span-4 capitalize">{line.start.name}</div>
                            <div className="col-span-4 capitalize text-right italic text-gray-600">{dateToHumanReadable(line.start.date)}</div>
                            <div className="col-span-2">
                                Inleveren
                            </div>
                            <div className="col-span-4 capitalize">{line.end.name}</div>
                            <div className="col-span-4 capitalize text-right italic text-gray-600">{dateToHumanReadable(line.end.date)}</div>
                        </div>: <div key={index} className="grid grid-cols-10 gap-1 col-span-10 items-center justify-center text-xs">
                            {!transportShown.includes(line.type) && transportShown.push(line.type) ? <h4 className="col-span-10 mt-2 font-medium text-xs">Vluchten</h4> : null}
                            <div className="col-span-8 capitalize">{line.start.name} - {line.end.name}</div>
                            <div className="col-span-2">
                                {line.number}
                            </div>
                            <div className="col-span-10 capitalize italic text-gray-600">{dateTimeToHumanReadable(line.start.date)} - {dateTimeToHumanReadable(line.end.date)}</div>
                        </div>
                    ))}
                </div>: null}
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
                        {!empty(element.items) ? element.items.map((item: any, index: number) => (
                            <div key={item.property_id + index.toString()} className="col-span-10 text-xs grid grid-cols-10 text-gray-600">
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
            </section>
            <div className={classNames("mt-4 flex", props.input.step == 1 ?  "justify-end" : "justify-between")}>
                {props.input.step > 1 ?
                    <button
                        onClick={() => props.handler.previousStep()}
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md bg-gray-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
                    >
                        <ChevronLeftIcon aria-hidden="true" className="-mr-0.5 size-5" />
                        Vorige
                    </button>
                    : null}
                {props.input.step < props.handler.steps().length ?
                    <button
                        onClick={() => props.handler.nextStep()}
                        type="button"
                        className="inline-flex items-center justify-end gap-x-2 rounded-md bg-nrv-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-nrv-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 w-40"
                    >
                        Volgende
                        <ChevronRightIcon aria-hidden="true" className="-mr-0.5 size-5" />
                    </button>
                    : null}
            </div>
        </>
    )
}