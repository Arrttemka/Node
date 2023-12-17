import Owner from './owner.entities.js';
import jwt from 'jsonwebtoken'

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

  const role = decoded.user.role;

  if (role != "Staff" && role != 'Admin') {
    return false;
  }

  return true;
}

class OwnerController {
  constructor(ownerService) {
    this.ownerService = ownerService;
  }

  createOwner = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const owner = new Owner({name: req.body.name});
    const ret = await this.ownerService.addOwner(owner);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  getOwners = async (_, res) => {
    const ret = await this.ownerService.getOwners();
    res.status(200).send(ret.data);
  }

  getOwner = async (req, res) => {
    const { id } = req.params;
    const ret = await this.ownerService.getOwner(id);

    if (ret.data == null)
      return res.status(200).send(ret.msg);
    
    return res.status(200).send(ret.data);
  };

  putOwner = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const owner = new Owner({name: req.body.name});
    const ret = await this.ownerService.putOwner(id, owner);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteOwner = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.ownerService.deleteOwner(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default OwnerController;