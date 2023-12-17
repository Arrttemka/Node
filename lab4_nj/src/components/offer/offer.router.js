
import express from 'express';

class OfferRouter {
  constructor(offerController) {
    this.offerController = offerController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.offerController.getOffer);
    router.route('/:id').put(this.offerController.putOffer);
    router.route('/:id').delete(this.offerController.deleteOffer);
    router.route('/').get(this.offerController.getOffers);
    router.route('/').post(this.offerController.createOffer);
    return router;
  }
}

export default OfferRouter;