import {Step} from "@/interface/wizard/environment/step";
import {SimpleInput} from "@/lib/wizard/input";
import {empty, getIsoDate} from "@/lib/utils/methods";
import Adults from "@/components/wizard/occupation/adults";
import Children from "@/components/wizard/occupation/children";
import Babies from "@/components/wizard/occupation/babies";
import Months from "@/components/wizard/matrix/months";
import Calendar from "@/components/wizard/matrix/calendar";
import Receipt from "@/components/wizard/receipt/receipt";
import React from "react";
import WizardHandler from "@/lib/wizard/handler";

export default class Step1 implements Step {
    #handler: WizardHandler;

    constructor(handler: WizardHandler) {
        this.#handler = handler;
    }

    id(): number {
        return 1;
    }

    label(): string {
        return "Wie en Wanneer?"
    }

    render(input: SimpleInput, data: any): React.ReactNode {
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
            // update(input);
        };

        const onChangeChildren = function(value: string) {
            updateAges(input.adults, Number(value), input.babies);
            // update(input);
        };

        const onChangeBabies = function(value: string) {
            updateAges(input.adults, input.children, Number(value));
            // update(input);
        };

        const onDisplayDateAction = function(date: Date) {
            input.display_date = getIsoDate(date);
            // update(input);
        };

        const onDateAction = function(date: Date) {
            input.date = getIsoDate(date);
            // update(input);
        };
        return (
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 pb-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-6 gap-y-5 col-span-4 content-start">
                    <h2 className="-mb-3 col-span-4 text-gray-600 text-md font-medium">Wie gaan er allemaal mee op reis?</h2>
                    <Adults input={input} className="col-span-1" wizardHandler={this.#handler}/>
                    <Children input={input} className="col-span-1" wizardHandler={this.#handler}/>
                    <Babies input={input} className="col-span-1" wizardHandler={this.#handler}/>
                    <h2 className="-mb-3 mt-1 col-span-4 text-gray-800 text-md font-medium">Wanneer willen jullie vertrekken?</h2>
                    {data.hasOwnProperty('date_durations') ? <Months input={input} date_durations={data.date_durations.dates} className="col-span-1" wizardHandler={this.#handler}/> : null}
                    {data.hasOwnProperty('price') ? <Calendar className="col-span-4" prices={data.price.prices} input={input} wizardHandler={this.#handler}/> : null}
                </div>
                <div className="col-span-2">
                    {data.hasOwnProperty('order') && data.order.order ? <Receipt input={input} booking={data.order}/> : null}
                </div>
            </div>
        )
    }

    calls(input: SimpleInput): string[] {
        const calls = ['price', 'date_durations'];
        if (!empty(input.date)) {
            calls.push('order');
        }
        return calls;
    }

    setWizardHandler(handler: WizardHandler): void {
        this.#handler = handler;
    }
}