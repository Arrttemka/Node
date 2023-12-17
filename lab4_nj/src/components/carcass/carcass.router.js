
import express from 'express';

class CarcassRouter {
  constructor(carcassController) {
    this.carcassController = carcassController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.carcassController.getCarcass);
    router.route('/:id').put(this.carcassController.putCarcass);
    router.route('/:id').delete(this.carcassController.deleteCarcass);
    router.route('/').get(this.carcassController.getCarcasss);
    router.route('/').post(this.carcassController.createCarcass);
    return router;
  }
}

export default CarcassRouter;