import  {Router} from 'express';

import HouseController from './controllers/HouseController';

const routes = new Router();

routes.post('/',HouseController.store);


export default routes;