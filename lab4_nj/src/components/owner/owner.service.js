import Response from '../../utils/response.js';
import Owner from './owner.entities.js';

class OwnerService {
    constructor() {
      this.owners = [];
    }
  
    addOwner = async (owner) => {
      if (owner.name == undefined)
        return new Response(null, 400, "Name cannot be null");

      const owners = await Owner.find({});

      if (owners.length == 0)
          owner.id = 0;
      else
          owner.id = owners[owners.length - 1].id + 1;

      await owner.save();
      return new Response(owner, 201, "Create successfull");
    };
  
    getOwners = async () => {
      return new Response(await Owner.find({}, 'id name'), 200, "Get successfull");
    }
  
    getOwner = async (id) => {
      const owner = await Owner.findOne({id: id}, 'id name');

      if (owner == null)
        return new Response(null, 400, "No such owner");

      return new Response(owner, 200, "Get successfull");
    };

    putOwner = async (id, owner) => {
      const _owner = await Owner.findOne({id: id}, 'id name');

      if (_owner == null)
        return new Response(null, 400, "No such owner");

      if (owner.name == null)
        return new Response(null, 400, "Name cannot be null");

      const ret = await Owner.findOneAndUpdate({id: id}, {name: owner.name}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteOwner = async (id) => {
      const _owner = await Owner.findOne({id: id}, 'id name');

      if (_owner == null)
        return new Response(null, 400, "No such owner");

      await Owner.findOneAndDelete({id: id});

      return new Response(_owner, 200, "Delete successfull");
    };
  }
  
  export default OwnerService;