import { App } from "./App";

export default class BaseApp {
    protected _app: App|undefined;
    constructor(app: App) {
        this._app = app;
    }
}