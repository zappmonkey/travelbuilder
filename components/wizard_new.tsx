'use client'

import {GenericContent} from "@/interface/content";
import WizardHandler from "@/lib/wizard/handler";
import Step1 from "@/components/wizard/steps/step_1";
import {SimpleInput} from "@/lib/wizard/input";
import {useState} from "react";

type Props = {
    product: any
    generic: GenericContent,
    input: SimpleInput
}

let wizardHandler: WizardHandler;

export default function WizardNew(props: Props)
{
    const [data, setData] = useState<any|null>(null);

    if (!data) {
        wizardHandler = new WizardHandler(props.input);
        wizardHandler.addStep(new Step1(wizardHandler));
        wizardHandler.onUpdate((data: any) => {
            setData(data);
        })
        wizardHandler.onError((error: any) => {
            console.error(error);
        })
        wizardHandler.init()
        console.log('init')
    }
    return (
        <>
            {data ? wizardHandler.render() : null}
        </>
    )
}