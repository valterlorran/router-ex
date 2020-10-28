# router-ex
Implements controllers for express
## Installation

```
$ npm install router-ex --save
```


## Documentation

### Controllers
Controllers are a cleaner way to handle your requests and avoid a file full of clousure.

To define a controller you need to extend the `Controller` class found in the package. The `Controller` class provides functions to help to respond text, files and errors.

All the actions must be declared as a public function and they receive two parameters: request and response.


```ts
// file: /Controllers/IndexController
import { Controller, Request, Response } from 'router-ex';
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


### Router

Parameters
- [app] Express application
- [options]
    - *baseUrl:string* base url path for the actions
    - *middlewares:array< middleware >* Middlewares to be applied in the route.  

```ts
// file: App.ts
import { Router, Request, Response, NextFunction } from 'router-ex';
import IndexController from './Controllers/IndexController';
import express from 'express';

const app = express();
const port = 3000;

const router = new Router(app, {
    baseUrl: '/api/'
});

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

### Resource Controllers

Easily create CRUD routes using the `resource` method. The following route declaration create several routes to handle a resource.

```ts
// routes.ts

router.resource('/dogs', DogsController);
```
Generated routes:

| HTTP METHOD | URI       | ACTION |
|-------------|-----------|--------|
| GET         | /dogs     | index  |
| POST        | /dogs     | store  |
| GET         | /dogs/:id | show   |
| PUT         | /dogs/:id | update |
| DELETE      | /dogs/:id | destroy|


Resource controller example:
```ts
// DogsController.ts
class DogsController extends Controller {
    public index() {}
    public store() {}
    public show() {}
    public update() {}
    public destroy() {}
}
```


### Middleware Classes

If you want to avoid writing closures for the middlewares, you can use the middleware service to register middleware classes.

```ts
import { IMiddleware, MiddlewareService, NextFunction, Response, Request } from "router-ex";

class MyMiddleware implements IMiddleware {
    public handler(request: Request, response: Response, next: NextFunction) {
        return next();
    }
}

MiddlewareService.register('my-middleware', new MyMiddleware);
```

Then you can use it in your router:

```ts
[...]
import 'Http/Middlewares/MyMiddleware'

router.get('/index', [IndexController, 'index']).middleware('my-middleware');
```