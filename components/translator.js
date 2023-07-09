const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')



class Translator {



    
    isLowerCase(str) {
        return str === str.toLowerCase() &&
               str !== str.toUpperCase();
    }
        reverseDict(obj){
            const ret = {};
            Object.keys(obj).forEach(key => {
              ret[obj[key]] = key;
            });
            //console.log(ret)
            return ret;
          }

    
    americanToBritishTitles(text){
        String.prototype.replaceAt = function(index, replacement) {
            return this.substring(0, index) + replacement + this.substring(index + replacement.length);
        }

        let lowTxt = text.toLowerCase()
        //console.log({lowTxt})
        let keys = Object.keys(americanToBritishTitles)
        let wordIndex;
        let word;
        let wordlen;
        for(let j=0; j < keys.length ; j++){
            if(lowTxt.includes(keys[j])){
                wordIndex = lowTxt.indexOf(keys[j])
                word = americanToBritishTitles[keys[j]];
                wordlen = word.length
                //console.log({wordlen})
                //console.log({wordIndex})
                //console.log(text[wordIndex])
                let isLower = this.isLowerCase(text[wordIndex])
                if(isLower){
                    //console.log('lower')

                    text = text.replace(keys[j],americanToBritishTitles[keys[j]])
                    console.log('orig',keys[j],'changed to:',americanToBritishTitles[keys[j]])
                }
                else{
                    let str = text;
                    let replace_char = text[wordIndex];
                    let replace_low_char = lowTxt[wordIndex];

                    let newStr = str.replaceAt(wordIndex,replace_low_char);
                    //console.log(newStr)
                    newStr = newStr.replace(keys[j],americanToBritishTitles[keys[j]])
                    //console.log(newStr)
                    text = newStr.replaceAt(wordIndex,replace_char);
                    console.log('orig',keys[j],'changed to:',americanToBritishTitles[keys[j]])
                    

                }

            }
            
        }
        return {text:text, pos: wordIndex + wordlen-1} 
    }

    americanToBritishSpelling(text){
        let keys = Object.keys(americanToBritishSpelling)
        for(let j=0; j < keys.length ; j++){
            if(text.includes(keys[j])){
                console.log('orig',keys[j],'changed to:',americanToBritishSpelling[keys[j]])
                text = text.replace(keys[j],americanToBritishSpelling[keys[j]])
            }
            
        }
        return text
    }

    americanToBritishSpellingOnly(text){
        let keys = Object.keys(americanOnly)
        for(let j=0; j < keys.length ; j++){
            if(text.includes(keys[j])){
                console.log('orig',keys[j],'changed to:',americanOnly[keys[j]])
                text = text.replace(keys[j],americanOnly[keys[j]])
            }
            
        }
        return text
    }

    americanToBritishSpellingOnlyBrit(text){
        let titlesRev = this.reverseDict(britishOnly)

        let keys = Object.keys(titlesRev)
        for(let j=0; j < keys.length ; j++){
            if(text.includes(keys[j])){
                console.log('orig',keys[j],'changed to:',titlesRev[keys[j]])
                text = text.replace(keys[j],titlesRev[keys[j]])
            }
            
        }
        return text
    }

    checkTime(text,mode){
        let timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g

        let times = text.match(timeRegex)
            if(times){
                times.forEach((time) => {
                    if(mode === 'american-to-british'){
                        text = text.replace(time, time.replace(':', '.'))
                    }else{
                        text = text.replace(time, time.replace('.', ':'))
                    }
                })
        }

        return text
    }
    
        
    americanToBritish(text){
        let americanToBritishTitles = this.americanToBritishTitles(text)

        /*let americanToBritishSpelling = this.americanToBritishSpelling(americanToBritishTitles)
        let americanToBritishSpellingOnly = this.americanToBritishSpellingOnly(americanToBritishSpelling)
        let americanToBritishSpellingOnlyBrit = this.americanToBritishSpellingOnlyBrit(americanToBritishSpellingOnly)
        
        let timechange = this.checkTime(americanToBritishSpellingOnlyBrit, 'american-to-british')*/
       
        //console.log('pos',americanToBritishTitles.pos)
        //console.log('text',americanToBritishTitles.text)
        let positionTracker = americanToBritishTitles.pos;
        let newStr = ''
        let textlen = text.length
        //console.log({positionTracker})
        //console.log(americanToBritishTitles.text.slice(positionTracker))
        while(positionTracker < textlen ){
            let good = americanToBritishTitles.text.slice(0,positionTracker+1);
            console.log({good})
            let sliced = americanToBritishTitles.text.slice(positionTracker);
            let nextamericanToBritishTitles = this.americanToBritishTitles(sliced)
            positionTracker += americanToBritishTitles.pos;

            console.log({newStr})
            //console.log({positionTracker})
            //console.log(nextamericanToBritishTitles.text)
        }

    }

    britishToAmerican(text){
        
    }

    splitText(text){
        let words = text.split(/\s*\b\s*/)
        //console.log(words)
    }
    
    findWord(word){

    }
        
}

module.exports = Translator;