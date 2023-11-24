/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import fs from 'fs';
import emailValidator from 'email-validator';
import dns from 'dns';

async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const data = fs.readFileSync(`${inputPath}`, 'utf-8');

  const oldArr: string[] = [];
  const trial: string[] = [];
  let newData: string[] = [];
  newData = data.split('\n');
  newData.pop();
  newData.shift();
  console.log(newData);

  for (let index = 0; index < newData.length; index++) {
    if (emailValidator.validate(newData[index]) === true) {
      oldArr.push(newData[index]);
      console.log(newData);
      trial.push(newData[index].split('@')[1].toString());
    }
    //getting the categories
  }

  function dnsResolve(domain: string) {
    return new Promise((resolve, reject) => {
      dns.resolveMx(domain, (err, value) => {
        if (err) {
          reject(err);
        } else {
          console.log(value);
          resolve(value); // Resolve with the MX records
        }
      });
    });
  }
console.log(oldArr)
  for (let i = 0; i < oldArr.length; i++) {
    await dnsResolve(oldArr[i]);
  }
  const validatedMails = [];
  validatedMails.unshift('Emails');
  const validatedEmails = validatedMails.join('n');

  fs.writeFile(outputFile, data, 'utf-8', (err) => {
    if(err) {
       console.log(err)
     }else
     {console.log('result saved');
    }
  });
}
validateEmailAddresses(
  ['../task-two/fixtures/inputs/small-sample.csv'],
  'validation.csv',
);
export default validateEmailAddresses;
