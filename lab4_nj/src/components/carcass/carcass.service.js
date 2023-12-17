import Response from '../../utils/response.js';
import Carcass from './carcass.entities.js';

class CarcassService {
    constructor() {
      this.carcasss = [];
    }
  
    addCarcass = async (carcass) => {
      console.log(carcass);

      if (carcass.name == null) {
        return new Response(null, 400, "Name cannot be null");
      }

      const carcasss = await Carcass.find({});  

      if (carcasss.length == 0)
          carcass.id = 0;
      else
          carcass.id = carcasss[carcasss.length - 1].id + 1;

      this.carcasss.push(carcass);

      await carcass.save();

      return new Response(carcass, 201, "Create successfull");
    };
  
    getCarcasss = async () => {
      var _carcasss = await Carcass.find({}, 'id name');

      return new Response(_carcasss, 200, "Get successfull");
    }
  
    getCarcass = async (id) => {

      console.log(id);
      //const carcass = this.carcasss.find((u) => u.id == id);
      const carcass = await Carcass.findOne({id: id}, 'id name');
      console.log(carcass);

      if (carcass == null)
        return new Response(null, 400, "No such carcass");

      return new Response(carcass, 200, "Get successfull");
    };

    putCarcass = async (id, carcass) => {
      const _carcass = await Carcass.findOne({id: id}, 'id name');

      if (_carcass == null)
        return new Response(null, 400, "No such carcass");

      if (carcass.name == null)
        return new Response(null, 400, "Name cannot be null");

      const ret = await Carcass.findOneAndUpdate({id: id}, {name: carcass.name}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteCarcass = async (id) => {
      const _carcass = await Carcass.findOne({id: id}, 'id name');

      if (_carcass == null)
        return new Response(null, 400, "No such carcass");

      await Carcass.findOneAndDelete({id: id});

      return new Response(_carcass, 200, "Delete successfull");
    };
  }
  
  export default CarcassService;