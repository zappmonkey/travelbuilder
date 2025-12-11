'use client'

import {GenericContent} from "@/interface/content";
import {InputSimple} from "@/lib/wizard/input";
import Calendar from "@/components/wizard/matrix/calendar";
import Adults from "@/components/wizard/occupation/adults";
import Children from "@/components/wizard/occupation/children";
import Babies from "@/components/wizard/occupation/babies";
import {useState} from "react";
import {empty, getIsoDate} from "@/lib/utils/methods";
import Months from "@/components/wizard/matrix/months";
import Receipt from "@/components/wizard/receipt/receipt";

type Props = {
    product: any
    generic: GenericContent,
    input: any
}

export default function Wizard(props: Props)
{
    let wizardLoading = false;
    const [wizard, setWizard] = useState<any|null>(null);
    let input: InputSimple = props.input;
    if (wizard !== null) {
        input = wizard.input;
    }
    const update = async function(input: InputSimple): Promise<void> {
        if (wizardLoading) {
            return;
        }
        wizardLoading = true;
        input.calls = ['price', 'selection', 'date_durations'];
        if (!empty(input.date)) {
            input.calls.push('order');
        }
        let url = `/api/wizard`
        await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(input)
        })
        .then((response) => response.json())
        .then(async (data) => {
            setWizard(data);
            wizardLoading = false;
        })
        .catch((err) => {
            wizardLoading = false;
            console.error(err)
        })
    };

    if (wizard === null) {
        console.log('init wizard');
        update(input);
        return (<>
            Loading prices
        </>)
    }

    const updateAges = function(adults: number, children: number, babies: number): void {
        const ages = [];
        input.adults = adults;
        input.children = children;
        input.babies = babies;
        for (let i = 0; i < adults; i++) {
            ages.push(30);
        }
        for (let i = 0; i < children; i++) {
            ages.push(8);
        }
        for (let i = 0; i < babies; i++) {
            ages.push(0);
        }
        input.ages = ages;
    };

    const onChangeAdults = function(value: string) {
        updateAges(Number(value), input.children, input.babies);
        update(input);
    };

    const onChangeChildren = function(value: string) {
        updateAges(input.adults, Number(value), input.babies);
        update(input);
    };

    const onChangeBabies = function(value: string) {
        updateAges(input.adults, input.children, Number(value));
        update(input);
    };

    const onDisplayDateAction = function(date: Date) {
        input.display_date = getIsoDate(date);
        update(input);
    };

    const onDateAction = function(date: Date) {
        input.date = getIsoDate(date);
        update(input);
    };

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 pb-6 ">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-6 gap-y-5 col-span-4 content-start">
                <h2 className="-mb-3 col-span-4 text-gray-600 text-md font-medium">Wie gaan er allemaal mee op reis?</h2>
                <Adults input={input} className="col-span-1" onChange={onChangeAdults}/>
                <Children input={input} className="col-span-1" onChange={onChangeChildren}/>
                <Babies input={input} className="col-span-1" onChange={onChangeBabies}/>
                <h2 className="-mb-3 mt-1 col-span-4 text-gray-800 text-md font-medium">Wanneer willen jullie vertrekken?</h2>
                {wizard.data.date_durations ? <Months input={input} date_durations={wizard.data.date_durations.dates} className="col-span-1" onChange={onDisplayDateAction}/> : null}
                {wizard.data.price ? <Calendar className="col-span-4" prices={wizard.data.price.prices} input={input} onDisplayDateAction={onDisplayDateAction} onDateAction={onDateAction}/> : null}
            </div>
            <div className="col-span-2">
                {wizard.data.order && wizard.data.order.order ? <Receipt input={input} booking={wizard.data.order}/> : null}
            </div>


            {/*{wizard.data.flight ? <Flights input={input} flights={wizard.data.flight}/> : null}*/}
        </div>
    )
}