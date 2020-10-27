import { Controller } from '../src/index';
export default class TestController extends Controller {

    public index() {
        return 'index';
    }

    public destroy() {
        return 'destroyed';
    }

    public store() {
        return 'stored';
    }

    public update() {
        return 'updated';
    }

    public show() {
        return 'showed';
    }
}