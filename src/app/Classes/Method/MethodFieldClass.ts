
export class MethodFieldClass {
    
    private _name: string;
    public get name() { return this._name }

    private _text: string;
    public get text() { return this._text }

    private _type: string;
    public get type() { return this._type }

    public value: string;

    constructor(name: string, text: string, type: string, value: string = "") {
        this._name = name;
        this._text = text;
        this._type = type;
        this.value = value;
    }



}