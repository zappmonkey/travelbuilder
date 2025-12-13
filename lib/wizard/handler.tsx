import {SimpleInput} from "@/lib/wizard/input";
import {getIsoDate} from "@/lib/utils/methods";
import {Step, StepSimple} from "@/interface/wizard/environment/step";
import React from "react";

export default class WizardHandler {
    #wizardLoading:boolean = false;
    #onUpdate: ((data: any) => void) | undefined;
    #onError: ((error: any) => void) | undefined;
    #steps: Dict<Step> = {};
    // @ts-ignore
    #input: SimpleInput;
    #data: any = {};
    #self: WizardHandler;

    constructor(input: SimpleInput) {
        this.#input = input;
        this.#self = this;
    }

    init(): void
    {
        this.update(this.input);
    }

    async update(input: SimpleInput|undefined = undefined): Promise<void> {
        if (this.#wizardLoading) {
            return;
        }
        if (input === undefined) {
            input = this.#input;
        }
        this.#wizardLoading = true;
        input.calls = this.step().calls(input);
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
            this.#data = data;
            if (data.hasOwnProperty("data")) {
                this.#data = data.data;
            }
            if (data.hasOwnProperty("input")) {
                this.#input = data.input;
            }
            if (this.#onUpdate !== undefined) {

                this.#onUpdate(this.#data);
            }
            this.#wizardLoading = false;
        })
        .catch((error) => {
            this.#wizardLoading = false;
            if (this.#onError !== undefined) {
                this.#onError(error);
            }
        })
    };

    set data(data: any) {
        this.#data = data;
    }

    set input(input: SimpleInput) {
        this.#input = input;
    }

    get input(): SimpleInput {
        return this.#input;
    }

    render(): React.ReactNode {
        return this.step().render(this.#input, this.#data);
    }

    setStep(step: number): void {
        if (this.#steps.hasOwnProperty(step.toString())) {
            this.#input.step = step;
        }
        this.update();
    }

    previousStep(): void {
        this.setStep(this.input.step - 1);
        this.update();
    }

    nextStep(): void {
        this.setStep(this.input.step + 1);
        this.update();
    }

    addStep(step: Step): void {
        const id = step.id().toString();
        this.#steps[id] = step;
    }

    step(): Step {
        const id = this.input.step.toString();
        if (!this.#steps.hasOwnProperty(id)) {
            throw new Error(`Step ${id} doesn't exist`);
        }
        return this.#steps[id];
    }

    steps(): StepSimple[]
    {
        const activeStep = this.step();
        const steps: StepSimple[] = [];
        let step: Step;
        for (const stepId in this.#steps) {
            step = this.#steps[stepId];
            steps.push({
                id: step.id(),
                label: step.label(),
                active: step.id() == activeStep.id(),
                completed: step.id() < activeStep.id()
            });
        }
        return steps;
    }

    onUpdate(listener: (data: any) => void): this {
        this.#onUpdate = listener;
        return this;
    }

    onError(listener: (error: any) => void): this {
        this.#onError = listener;
        return this;
    }

    updateAges(adults: number, children: number, babies: number): void {
        const ages = [];
        this.#input.adults = adults;
        this.#input.children = children;
        this.#input.babies = babies;
        for (let i = 0; i < adults; i++) {
            ages.push(30);
        }
        for (let i = 0; i < children; i++) {
            ages.push(8);
        }
        for (let i = 0; i < babies; i++) {
            ages.push(0);
        }
        this.#input.ages = ages;
    };

    onChangeAdults(value: string) {
        this.updateAges(Number(value), this.input.children, this.input.babies);
        this.update();
    };

    onChangeChildren(value: string) {
        this.updateAges(this.input.adults, Number(value), this.input.babies);
        this.update();
    };

    onChangeBabies(value: string) {
        this.updateAges(this.input.adults, this.input.children, Number(value));
        this.update();
    };

    onDisplayDateAction(date: Date) {
        this.input.display_date = getIsoDate(date);
        this.update();
    };

    onDateAction(date: Date) {
        this.input.date = getIsoDate(date);
        this.update();
    };
}