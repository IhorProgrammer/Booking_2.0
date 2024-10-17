import { timeout } from "rxjs";
import Connection, { ConnectionName } from "../AppSetting/Connection";
import ResponseTemplate from "../AppSetting/ResponseTemplate";
import { MethodFormClass } from "./MethodFormClass";

export class MethodInfoClass {
    
    //Назва нашого методу
    private _name: string;
    get name(): string {
        return this._name;
    }

    private _methodName: string;
    get methodName(): string {
        return this._methodName;
    }

    private _text: string;
    get text(): string {
        return this._text;
    }

    //Використовується для підключення до серверу і відправки запитів
    private _connection: string;
    get connection(): string {
        return this._connection;
    }

    public form: MethodFormClass;
    
    public Response: string = ResponseTemplate.Get;
    
    private _loading : boolean = false;
    public get loading() : boolean {
        return this._loading;
    }
    

    public Submit(event: SubmitEvent) {
        event?.preventDefault();
        console.log(event);
        this._loading = true;
        const res = this.form.submit(this.connection, event ).then((res: any) => {
            setTimeout(() => { 
                this.Response = JSON.stringify(res, null, 2);
                this._loading = false; 
            }, 1400);
        }).catch( ( res: any ) => {
            this.Response = JSON.stringify(res, null, 2);
            this._loading = false; 
        });
    }



    constructor(name: string, methodName: string, text: string, connectionName: ConnectionName, form: MethodFormClass) {
        this._name = name;
        this._text = text;
        this._methodName = methodName;
        this._connection = Connection.instance.get(connectionName);
        this.form = form;
    }

}

export function GetFormData(formHTML: HTMLFormElement): FormData {
    
    const formElements = formHTML.querySelectorAll('[ng-reflect-name]') as NodeListOf<HTMLInputElement>;
    const formData = new FormData();

    formElements.forEach((inputElem: HTMLInputElement) => {
        // Отримання імені з атрибута ng-reflect-name
        const name = inputElem.getAttribute('ng-reflect-name');
        
        if (inputElem.type === 'file') {
            const files = inputElem.files; 
            if (files) {
                formData.append(name || inputElem.id, files[0]); 
            }
        } else {
            formData.append(name || inputElem.id, inputElem.value || "");
        }
    });
    
    return formData;
}