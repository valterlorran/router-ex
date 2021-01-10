import { Controller } from '../src/index';
export default class IndexController extends Controller {

    public index() {
        // const { indexInj } = this.app;

        // indexInj.something();
        
        return 'Hello World!';
    }
}