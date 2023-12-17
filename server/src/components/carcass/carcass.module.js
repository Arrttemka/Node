import CarcassController from './carcass.controller.js';
import CarcassService from './carcass.service.js';
import CarcassRouter from './carcass.router.js';

const carcassService = new CarcassService();
const carcassController = new CarcassController(carcassService);
const carcassRouter = new CarcassRouter(carcassController);

export default {
  service: carcassService,
  controller: carcassController,
  router: carcassRouter.getRouter(),
};