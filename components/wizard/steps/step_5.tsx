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
import Print from "@/components/ui/dev/print";

export default class Step5 implements Step {
    #handler: WizardHandler;

    constructor(handler: WizardHandler) {
        this.#handler = handler;
    }

    id(): number {
        return 5;
    }

    label(): string {
        return "Afronden"
    }

    render(input: SimpleInput, data: any): React.ReactNode {
        return (
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 pb-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-6 gap-y-5 col-span-4 content-start">
                    <Print context={this.#handler.steps()}/>
                </div>
                <div className="col-span-2">
                    {data.hasOwnProperty('order') && data.order.order ? <Receipt input={input} booking={data.order} handler={this.#handler}/> : null}
                </div>
            </div>
        )
    }

    calls(input: SimpleInput): string[] {
        return ['order'];
    }

    setWizardHandler(handler: WizardHandler): void {
        this.#handler = handler;
    }
}