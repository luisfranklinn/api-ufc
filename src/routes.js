import  {Router} from 'express';

import HouseController from './controllers/HouseController';

const routes = new Router();

routes.post('/houses', HouseController.store);


export default routes;