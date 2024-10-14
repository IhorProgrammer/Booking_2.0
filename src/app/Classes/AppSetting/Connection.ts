import * as appsetting from '../../../appsetting.json';

export default class Connection {
    static #instance: Connection;

    public static get instance(): Connection {
        if (!Connection.#instance) {
            Connection.#instance = new Connection();
        }
        return Connection.#instance;
    }

    public get(connectionName: ConnectionName): string {
        switch(connectionName) {
            case ConnectionName.Client: return this.ClientConnection;
            case ConnectionName.Token: return this.TokenConnection;
        }
    }

    private get ClientConnection() : string {
        return appsetting.connection.ClientServer;
    }
    
    private get TokenConnection() : string {
        return appsetting.connection.ClientServer;
    }
    
    constructor() {}
}

export enum ConnectionName {
    Client,
    Token,
}