import {Input} from "@/lib/wizard/input";
import {WizardRequest} from "@/interface/wizard/request";
import {wizard} from "@/lib/api/wizard";
import {empty} from "@/lib/utils/methods";

export async function POST(
    request: Request
) {
    let json = await request.json();
    const input = new Input(Number(json.id));
    await input.read()
    input.ages = json.ages;
    input.duration = json.duration;
    input.date = json.date;
    input.display_date = json.display_date;
    input.step = json.step;
    input.groups = json.groups;
    let calls = json.calls;
    // if (input.date !== undefined) {
    //     calls.push("book_check");
    // }
    await input.write();
    let date = input.date;
    if (empty(date)) {
        date = input.display_date;
    }
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
        "date": date,
        "display_date": input.display_date,
        "dates_around": 20,
        "duration": input.duration,
        "durations_around": undefined,
        "calls": calls,
        "groups": input.groups
    };
    console.log(JSON.stringify(wizardRequest));
    let data = await wizard(wizardRequest);
    console.log(JSON.stringify(data));
    return new Response(JSON.stringify({
        "input": input.simple(),
        "data": data
    }),{
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}