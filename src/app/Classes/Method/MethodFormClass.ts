import { MethodFieldClass } from "./MethodFieldClass";

export class MethodFormClass {
    
    //Чи використовується шифрування при передачі даних?
    private _encryption: boolean;
    public get encryption() { return this._encryption }


    //Поля що використовуються
    private _fields: MethodFieldClass[];
    public get fields() { return this._fields }



    private _submit: Function;
    public get submit() { 
        return this._submit 
    }


    

    constructor(encryption: boolean, fields: MethodFieldClass[], submit: MethodSubmitFunctionParam) {
        this._encryption = encryption;
        this._fields = fields;
        this._submit = submit;
    }



}

type MethodSubmitFunctionParam = ( connection: string, event: any) => void;
