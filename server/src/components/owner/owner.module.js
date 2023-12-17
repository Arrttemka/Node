import OwnerController from './owner.controller.js';
import OwnerService from './owner.service.js';
import OwnerRouter from './owner.router.js';

const ownerService = new OwnerService();
const ownerController = new OwnerController(ownerService);
const ownerRouter = new OwnerRouter(ownerController);

export default {
  service: ownerService,
  controller: ownerController,
  router: ownerRouter.getRouter(),
};