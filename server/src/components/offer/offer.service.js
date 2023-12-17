import Response from '../../utils/response.js';
import carcassModule from '../carcass/carcass.module.js';
import ownerModule from '../owner/owner.module.js';
import Offer from './offer.entities.js';
import path from 'path'
import fs from 'fs'

class OfferService {
    constructor() {
      this.offers = [];
    }
  
    addOffer = async (offer) => {
        if (offer.title == null || offer.summary == null || offer.WIN == null ||
            offer.owner_id == null || offer.carcass_id == null || offer.cost == null)
            return new Response(null, 400, "Offer fields cannot be null");

        const owner_ret = await ownerModule.service.getOwner(offer.owner_id);
        const owner = owner_ret.data;

        const carcass_ret = await carcassModule.service.getCarcass(offer.carcass_id);
        const carcass = carcass_ret.data;

        console.log(owner, carcass);

        if (carcass == null)
            return new Response(null, 400, "No such carcass");
        if (owner == null)
            return new Response(null, 400, "No such owner");

        const offers = await Offer.find({});

        if (offers.length == 0)
            offer.id = 0;
        else
            offer.id = offers[offers.length - 1].id + 1;

        console.log(offer.imgUrl);

        await offer.save();
        return new Response(offer, 201, "Create Successfull");
    };
  
    getOffers = async (filterCarcass, sort, find) => {
      var offers = await Offer.find({});

      if (filterCarcass != null) {
        var _carcasss = await carcassModule.service.getCarcasss();
        var carcasss = JSON.parse(JSON.stringify(_carcasss.data));
        var carcass = carcasss.find((carcass) => carcass.name == filterCarcass);
        if (carcass != null) 
          offers = offers.filter((offer) => offer.carcass_id == carcass.id);
        else
          offers =offers.filter((offer) => offer.carcass_id == -1);
      }

      if (sort != null) {
        if (sort == 'asc') {
          offers.sort((a,b) => {
            if ( a.cost > b.cost ){
              return 1;
            }
            if ( a.cost < b.cost ){
              return -1;
            }
            return 0;
          });
        } else if (sort == 'desc') {
          offers.sort((a,b) => {
            if ( a.cost > b.cost ){
              return -1;
            }
            if ( a.cost < b.cost ){
              return 1;
            }
            return 0;
          });
        }
      }

      if (find != null) {
        offers = offers.filter((offer) => offer.title.startsWith(find));
      }

      return new Response(offers, 200, "Get Successfull");
    }
  
    getOffer = async (id) => {
      //const offer = this.offers.find((u) => u.id == id);
      const offer = await Offer.findOne({id: id}, 'id title cost summary WIN owner_id carcass_id imgUrl');

      if (offer == null) {
        return new Response(null, 400, "No such offer");
      }

      return new Response(offer, 200, "Get successfull");
    };

    putOffer = async (id, offer) => {
      console.log(offer);
      const _offer = await Offer.findOne({id: id}, 'id title cost summary WIN owner_id carcass_id imgUrl');

      if (_offer == null) {
        return new Response(null, 400, "No such offer");
      }

      console.log(offer);

      if (offer.title == null || offer.title == '' || offer.summary == null || offer.summary == '' || offer.WIN == null || offer.WIN == '' ||
        offer.owner_id == null || offer.carcass_id == null || offer.cost == null || offer.cost == '')
        return new Response(null, 400, "Offer fields cannot be null");

        const owner_ret = await ownerModule.service.getOwner(offer.owner_id);
        const owner = owner_ret.data;

        const carcass_ret = await carcassModule.service.getCarcass(offer.carcass_id);
        const carcass = carcass_ret.data;

        console.log(owner, carcass);

        if (carcass == null)
            return new Response(null, 400, "No such carcass");
        if (owner == null)
            return new Response(null, 400, "No such owner");

      const ret = await Offer.findOneAndUpdate({id: id}, {title: offer.title, summary: offer.summary, WIN: offer.WIN, cost: offer.cost, owner_id: offer.owner_id, carcass_id: offer.carcass_id, imgUrl: offer.imgUrl}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteOffer = async (id) => {
      const _offer = await Offer.findOne({id: id});

      if (_offer == null)
        return new Response(null, 400, "No such offer");

      await Offer.findOneAndDelete({id: id});

      return new Response(_offer, 200, "Delete successfull");
    }
  }
  
  export default OfferService;