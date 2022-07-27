/** Convert date format for a data field to MM/DD/YYYY
 * @param {object} jsonData       List of objects containing field names as keys and data values.
 * @param {string} dataFieldName  The name of the data field.
 * 
Option          Values          Sample output
----------------------------------------------------
weekday         'narrow'        'M'
                'short'         'Mon'
                'long'          'Monday'

year            '2-digit'       '01'
                'numeric'       '2001'

month           '2-digit'       '01'
                'numeric'       '1'
                'narrow'        'J'
                'short'         'Jan'
                'long'          'January'

day             '2-digit'       '01'
                'numeric'       '1'

hour            '2-digit'       '12 AM'
                'numeric'       '12 AM'

minute          '2-digit'       '0'
                'numeric'       '0'

second          '2-digit'       '0'
                'numeric'       '0'

timeZoneName    'short'         '1/1/2001 GMT+00:00'
                'long'          '1/1/2001 GMT+00:00'
 */
const reformatDate = (jsonData, dateFieldName, year = "numeric", month = "2-digit", day = "2-digit") => {
  // Citation for following code block
  // Date: 7/23/2022
  // Adapted from:
  // Source URL: https://stackoverflow.com/a/17743990/5715461
  // Reformat birth_date to MM/DD/YYYY
  const options = {
      year: year,
      month: month,
      day: day
  };
  for (let i = 0; i < jsonData.length; i++) {
      let dateFromDb = jsonData[i][dateFieldName];
      let dateForUi = new Date(dateFromDb).toLocaleString("en", options);
      jsonData[i][dateFieldName] = dateForUi;
    }
    //console.log(`Hello from reformatDate in helpers.js`);

};

// Citation for the function
// Date: 7/26/2022
// Adapted from:
// Source URL: https://stackoverflow.com/a/2998874/5715461
/** Pads a string with the specified number of zeroes.
 * @param {object} num            the string to pad
 * @param {string} dataFieldName  number of zeroes to pad
*/
const zeroPad = (num, places) => String(num).padStart(places, '0');

// Citation for the function description about date format for <input type="date">
// Date: 7/26/2022
// Adapted from:
// Source URL: https://stackoverflow.com/a/46175697/5715461
/** Convert date format for a data field to YYYY-MM-DD. This is necessary 
 * for input elements of type "date" since Chrome expects the value of the date to be in YYYY-MM-DD format.
 * @param {object} jsonData       Object containing field names as keys and data values.
 * @param {string} dataFieldName  The name of the data field.
*/
const reformatDateForDropDownMenu = (jsonData, dateFieldName) => {

  const date = jsonData[dateFieldName];
  let dateForDropDownMenu = new Date(date);

  // Citation for following code block
  // Date: 7/26/2022
  // Adapted from:
  // Source URL: https://attacomsian.com/blog/javascript-date-get-day-month-year
  // Get year, month, and day part from the date
  const year = dateForDropDownMenu.getFullYear();
  const month = zeroPad(dateForDropDownMenu.getMonth() + 1, 2); // getMonth() returns month from 0 to 11
  const day = zeroPad(dateForDropDownMenu.getDate(), 2);

  // Generate yyyy-mm-dd date string
  const formattedDate = year + "-" + month + "-" + day;
  //console.log(`formattedDate from reformatDateForDropDownMenu: ${formattedDate}`);  // Prints: 2022-07-23

  jsonData[dateFieldName] = formattedDate;

  //console.log(`Hello from reformatDateForDropDownMenu in helpers.js`);
};



//exports.reformatDate = reformatDate;
export { reformatDate, reformatDateForDropDownMenu };
