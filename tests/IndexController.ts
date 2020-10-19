import { Controller } from '../src/index';
export default class IndexController extends Controller {

    public index() {
        return 'Hello World!';
    }
}