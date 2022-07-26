const reformatDate = (jsonData, dateFieldName) => {
  // Citation for following code block
  // Date: 7/23/2022
  // Adapted from:
  // Source URL: https://stackoverflow.com/a/17743990/5715461
  // Reformat birth_date to MM/DD/YYYY
  const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
  };
  for (let i = 0; i < jsonData.length; i++) {
      let dateFromDb = jsonData[i][dateFieldName];
      let dateForUi = new Date(dateFromDb).toLocaleString("en", options);
      jsonData[i][dateFieldName] = dateForUi
    }
    //console.log(`Hello from reformatDate in helpers.js`);

};

//exports.reformatDate = reformatDate;
export { reformatDate };
