import * as appsetting from '../../../appsetting.json';

export default class ResponseTemplate {
    public static get Get(): string {
        console.log( JSON.stringify(appsetting.response_template, null, 2));
        return JSON.stringify(appsetting.response_template, null, 2);
    }
}