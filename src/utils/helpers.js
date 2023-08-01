//the formatPrice is for convert cents to the dollars
export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat("en-US", {
    //Intl is international and NumberFormat is the method on it.
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber; //we can remove this line and add return instead of const before newNumber
};

//getUniqueValue function for company,category, colors filters on Products page
export const getUniqueValues = (data, type) => {
  //data is all_products and type can be category, colors, company
  let unique = data.map((item) => item[type]); //Item[type] the answer will be the 3 arrays of categories, companies, colors.
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)]; //we add 'all' ourself for the convienent and then the new Set() that only shows the unique values in the company, category, colors arrays
};
