import Offer from './offer.entities.js';
import jwt, { decode } from 'jsonwebtoken';

function check_jwt(token) {

  const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
    if (err) {
    } else {
      return decoded;
    }
  });

  if (decoded == undefined) {
    return false;
  }

  return true;
}

class OfferController {
  constructor(offerService) {
    this.offerService = offerService;
  }

  createOffer = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))// ограничение использования API для неавторизованных пользователей
      return res.status(403).send('Forbidden');
    console.log(req.body.image);
    const offer = new Offer({title: req.body.title, summary: req.body.summary, WIN: req.body.WIN, cost: req.body.cost, owner_id: req.body.owner_id, carcass_id: req.body.carcass_id, imgUrl: req.body.imgUrl});
    
    if (req.body.cost < 0) {
      return res.status(404).send('Price cannot be negative');
    }

    if (req.body.WIN < 0) {
      return res.status(404).send('WIN cannot be negative');
    }

    const ret = await this.offerService.addOffer(offer);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getOffers = async (req, res) => {
    const filterCarcass =  req.query.filterCarcass;
    const sort = req.query.sort;
    const find = req.query.find;

    const ret = await this.offerService.getOffers(filterCarcass, sort, find);
    return res.status(ret.status_code).send(ret.data);
  }

  getOffer = async (req, res) => {
    const { id } = req.params;

    const ret = await this.offerService.getOffer(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putOffer = async (req, res) => {
    const { id } = req.params;

    if (req.body.cost < 0) {
      return res.status(404).send('Price cannot be negative');
    }

    if (req.body.WIN < 0) {
      return res.status(404).send('WIN cannot be negative');
    }

    const token = req.get('Authorization');

    if (!check_jwt(token)) 
      return res.status(403).send('Forbidden');

    const offer = new Offer({title: req.body.title, summary: req.body.summary, WIN: req.body.WIN, cost: req.body.cost, owner_id: req.body.owner_id, carcass_id: req.body.carcass_id, imgUrl: req.body.imgUrl});
    const ret = await this.offerService.putOffer(id, offer);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteOffer = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.offerService.deleteOffer(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default OfferController;