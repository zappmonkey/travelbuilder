import {SimpleInput} from "@/lib/wizard/input";
import React from "react";
import WizardHandler from "@/lib/wizard/handler";

export interface StepSimple {
    id: number;
    label: string;
}

export interface Step {
    id(): number
    label(): string
    render(input: SimpleInput, data: any): React.ReactNode;
    calls(input: SimpleInput): string[];
    setWizardHandler(handler: WizardHandler): void
}