import ServiceProvider from "../ServiceProvider";

export class RouterServiceProvider extends ServiceProvider {
    protected map() {};

    public boot() {
        this.loadRoutes();
    }

    protected loadRoutes() {
        this.map();
    }
}