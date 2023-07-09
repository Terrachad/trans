'use strict';

const Translator = require('../components/translator.js');
const americanOnly = require('../components/american-only.js');
const americanToBritishSpelling = require('../components/american-to-british-spelling.js');
const americanToBritishTitles = require("../components/american-to-british-titles.js")
const britishOnly = require('../components/british-only.js')

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body)
      const {text,locale} = req.body

      let swapped = translator.reverseDict(americanToBritishTitles)
      //console.log(swapped)

      let checkwords = translator.splitText(text)
      if((locale && text) === undefined)
        return res.json({ error: 'Required field(s) missing' })

      if(locale == 'american-to-british'){
        let bta = translator.americanToBritish(text)
        return res.json({translation:bta})
      }

      if(!text)
        return res.json({ error: 'No text to translate' })

      if(locale != 'american-to-british' || locale != 'british-to-american')
        return res.json({ error: 'Invalid value for locale field' })


      
    });
};
