import OfferController from './offer.controller.js';
import OfferService from './offer.service.js';
import OfferRouter from './offer.router.js';

const offerService = new OfferService();
const offerController = new OfferController(offerService);
const offerRouter = new OfferRouter(offerController);

export default {
  service: offerService,
  controller: offerController,
  router: offerRouter.getRouter(),
};