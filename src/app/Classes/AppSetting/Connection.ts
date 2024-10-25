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
            case ConnectionName.Residence: return this.ResidenceConnection;
        }
    }

    private get ClientConnection() : string {
        return appsetting.connection.ClientServer;
    }
    
    private get TokenConnection() : string {
        return appsetting.connection.TokenServer;
    }
    
    
    private get ResidenceConnection() : string {
        return appsetting.connection.ResidenceServer;
    }

    constructor() {}
}

export enum ConnectionName {
    Client,
    Token,
    Residence
}