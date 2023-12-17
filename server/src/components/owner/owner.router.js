
import express from 'express';

class OwnerRouter {
  constructor(ownerController) {
    this.ownerController = ownerController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.ownerController.getOwner);
    router.route('/:id').put(this.ownerController.putOwner);
    router.route('/:id').delete(this.ownerController.deleteOwner);
    router.route('/').get(this.ownerController.getOwners);
    router.route('/').post(this.ownerController.createOwner);
    return router;
  }
}

export default OwnerRouter;