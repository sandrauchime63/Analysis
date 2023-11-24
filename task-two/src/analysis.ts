/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

import fs from 'fs';
import emailValidator from 'email-validator';

function analyseFiles(inputPaths: string[], outputPath: string) {
  console.log(inputPaths);
   type catOBJ = {
    [key: string]: number;
  };
  type output = {
    'valid-domains': string[];
    totalEmailsParsed: number;
    totalValidEmails: number;
    categories: catOBJ;
  };
  const data = fs.readFileSync(`${inputPaths}`, 'utf-8');

  console.log(data);

  //spliting the string into an array and removing the irrelevants
  let newData: string[] = [];
  newData = data.split('\n');
  newData.pop();
  newData.shift();
  console.log(newData);

  // to get the totalEmailsParsed
  const totalParsedEMails = newData.length;

  // to find the categories
  type CatOBJ = {
    [key: string]: number;
  };

  const oldArr: string[] = [];
  const trial: string[] = [];
  const catObj: CatOBJ = {};
  for (let index = 0; index < newData.length; index++) {
    if (emailValidator.validate(newData[index]) === true) {
      oldArr.push(newData[index]);
      trial.push(newData[index].split('@')[1].toString());
    }
    //getting the categories
  }
  console.log(trial);
  for (let i = 0; i < trial.length; i++) {
    if (catObj[trial[i]]) {
      catObj[trial[i]]++;
    } else {
      catObj[trial[i]] = 1;
    }
  }

  const brandArr = oldArr.length;

  const totalOutput = {
    'valid-domains': trial,
    totalEmailsParsed: totalParsedEMails,
    totalValidEmails: brandArr,
    categories: catObj,
  };

  fs.writeFileSync(outputPath, JSON.stringify(totalOutput), 'utf-8');
}

analyseFiles(['../task-two/fixtures/inputs/small-sample.csv'], 'analysis.json');
export default analyseFiles;
