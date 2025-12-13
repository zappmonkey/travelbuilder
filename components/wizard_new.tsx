'use client'

import {GenericContent} from "@/interface/content";
import WizardHandler from "@/lib/wizard/handler";

import {SimpleInput} from "@/lib/wizard/input";
import React, {useState} from "react";
import Step1 from "@/components/wizard/steps/step_1";
import Step2 from "@/components/wizard/steps/step_2";
import Step3 from "@/components/wizard/steps/step_3";
import Step4 from "@/components/wizard/steps/step_4";
import Step5 from "@/components/wizard/steps/step_5";
import Steps from "@/components/wizard/steps/steps";

type Props = {
    product: any
    generic: GenericContent,
    input: SimpleInput
}

let wizardHandler: WizardHandler;

export default function WizardNew(props: Props)
{
    const [data, setData] = useState<any|null>(null);

    if ((!data && wizardHandler === undefined) || wizardHandler === undefined) {
        wizardHandler = new WizardHandler(props.input);
        wizardHandler.addStep(new Step1(wizardHandler));
        wizardHandler.addStep(new Step2(wizardHandler));
        wizardHandler.addStep(new Step3(wizardHandler));
        wizardHandler.addStep(new Step4(wizardHandler));
        wizardHandler.addStep(new Step5(wizardHandler));
        wizardHandler.onUpdate((data: any) => {
            setData(data);
        })
        wizardHandler.onError((error: any) => {
            console.error(error);
        })
        wizardHandler.init()
    }
    return (
        <>
            {data ? <>
                <Steps handler={wizardHandler} />
                {wizardHandler.render()}
            </>: null}
        </>
    )
}