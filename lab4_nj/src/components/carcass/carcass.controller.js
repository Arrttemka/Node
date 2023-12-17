import Carcass from './carcass.entities.js';
import CarcassService from './carcass.service.js';
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

class CarcassController {
  constructor(carcassService) {
    this.carcassService = carcassService;
  }

  createCarcass = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const carcass = new Carcass({name: req.body.name});
    console.log(carcass);
    const ret = await this.carcassService.addCarcass(carcass);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);
    
    return res.status(ret.status_code).send(ret.data);
  };

  getCarcasss = async (_, res) => {
    const ret = await this.carcassService.getCarcasss();
      res.status(200).send(ret.data);
      
    //;
  }

  getCarcass = async (req, res) => {
    const { id } = req.params;
    const ret = await this.carcassService.getCarcass(id);
    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

      

    return res.status(ret.status_code).send(ret.data);
  };

  putCarcass = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const carcass = new Carcass({name: req.body.name});
    const ret = await this.carcassService.putCarcass(id, carcass);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteCarcass = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.carcassService.deleteCarcass(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default CarcassController;