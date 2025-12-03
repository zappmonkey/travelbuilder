import {Input} from "@/lib/wizard/input";
import {WizardRequest} from "@/interface/wizard/request";
import {wizard} from "@/lib/api/wizard";

export async function POST(
    request: Request
) {
    let json = await request.json()
    const input = new Input(Number(json.id));
    await input.read()
    input.ages = json.ages;
    input.duration = json.duration;
    input.date = json.date;

    let calls = json.calls;
    // if (input.date !== undefined) {
    //     calls.push("book_check");
    // }
    await input.write();
    let wizardRequest: WizardRequest = {
        "product": {
            "id": input.id,
            "type": "PACKAGE"
        },
        "occupation": {
            "adults": undefined,
            "children": undefined,
            "babies": undefined,
            "ages": input.ages
        },
        "date": input.date,
        "dates_around": 40,
        "duration": input.duration,
        "durations_around": undefined,
        "calls": calls
    };
    console.log(wizardRequest);
    let data = await wizard(wizardRequest);
    return new Response(JSON.stringify({
        "input": (await input.simple()).json(),
        "data": data
    }),{
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}