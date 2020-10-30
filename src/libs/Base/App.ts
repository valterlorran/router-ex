
export class App {
    protected apps: Array<any> = [];

    public register(app: any) {
        this.apps.push(app);
    }
}