import userModule from '../components/user/user.module.js';
import carcassModule from '../components/carcass/carcass.module.js';
import ownerModule from '../components/owner/owner.module.js';
import offerModule from '../components/offer/offer.module.js';
import articleModule from '../components/article/article.module.js'
import vacancyModule from '../components/vacancy/vacancy.module.js'
import historyModule from '../components/history/history.module.js'
import authModule from '../components/Auth/auth.module.js'
import orderModule from '../components/order/order.module.js';

export default (app) => {
  app.use('/users', userModule.router);
  app.use('/carcasss', carcassModule.router);
  app.use('/owners', ownerModule.router);
  app.use('/offers', offerModule.router);
  app.use('/articles', articleModule.router);
  app.use('/vacancies', vacancyModule.router);
  app.use('/histories', historyModule.router);
  app.use('/auth', authModule.router);
  app.use('/orders', orderModule.router);
};