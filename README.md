# router-ex
Implements controllers for express
## Installation

```
$ npm install router-ex --save
```


## Usage

### Controllers
To define a controller simply create a class extend `Controller` from `router-ex` module.

```ts
import { Controller } from 'router-ex';
import { Request, Response } from 'express';
export default class IndexController extends Controller {

    /** Returns a simple text response */
    public index(request: Request, response: Response) {
        return 'Hello World!';
    }

    /** Returns a file as response */
    public file(request: Request, response: Response) {
        return this.respondFile('/index.html');
    }

    /** Returns a error */
    public error(request: Request, response: Response) {
        return this.respondError(500, 'Error');
    }
}
```

### Routing
The routes are defined by the `Router` class.

```ts
import { Router } from 'router-ex';
import express from 'express';

const app = express();
const port = 3000;

const router = new Router(app);

router.get('/index', [IndexController, 'index']).middleware(
    (request: Request, response: Response, next: NextFunction)=>{
        // middleware
        return next();
    }
);

router.get('/file', [IndexController, 'file']);

router.get('/error', [IndexController, 'error']);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
```