
export class ViewMethodClass {
    public HTML?: string;
    public CSS?: string;

    public getHTMLTemlpate() {
        return `${window.location.origin}/${this.HTML}`;
    }

    constructor(HTML: string, CSS: string) {
        if( HTML != "" ) this.HTML = HTML;
        if( CSS != "" ) this.CSS = CSS;
    }
} 