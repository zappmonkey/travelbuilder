type Props = {
    context: any
    hide?: boolean
}

function _twig_print(value: any, hide: boolean) {
    var vis = "";
    var json = JSON.stringify(value, undefined, 4);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (hide === true) {
        vis = "display: none;";
    }
    return "<pre style='font-size: 70%;" + vis + "'>" + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var clr = 'magenta';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                clr = 'gray';
            } else {
                clr = 'green';
            }
        } else if (/true|false/.test(match)) {
            clr = 'blue';
        } else if (/null/.test(match)) {
            clr = 'red';
        }
        return '<span style="color:' + clr + '">' + match + '</span>';
    }) + "</pre>";
};

export default function Print(props: Props) {
    let hide = false;
    if (props.hide) {
        hide = true;
    }
    return (
        <div className="w-xl" dangerouslySetInnerHTML={{__html: _twig_print(props.context, hide)}}></div>
    )
}