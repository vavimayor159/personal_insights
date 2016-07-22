/**
 * InsightsController
 *
 * @description :: Server-side logic for managing insights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const watson = require('watson-developer-cloud');
const personality_insights = watson.personality_insights({
  username: process.env.WATSON_USER || sails.config.watson_user,
  password: process.env.WATSON_PASS || sails.config.watson_pass,
  version: 'v2'
});

module.exports = {

  /** Servicio con el que consultamos a watson por más información acerca de los
   * datos que facebook nos arroja */
  readData: (req, res) => {
    personality_insights.profile({
        text: req.param('data'),
        language: 'es, en' },
      function (err, response) {
        if (err)
          res.send('error:', err);
        else
          res.send(response);
      });
  }
};

