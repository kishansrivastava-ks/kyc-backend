class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]); //removing the excluded fields from the query string

    // advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    if (queryObj.name) {
      this.query = this.query.find({
        name: { $regex: `^${queryObj.name}`, $options: "i" },
      });
    } else {
      this.query = this.query.find(JSON.parse(queryStr));
    }

    return this;
  }

  // filter() {
  //   const queryObj = { ...this.queryStr };
  //   const excludedFields = ["page", "sort", "limit", "fields"];
  //   excludedFields.forEach((el) => delete queryObj[el]); //removing the excluded fields from the query string
  //   console.log(queryObj);

  //   // Advanced filtering for autocomplete
  //   let queryStr = JSON.stringify(queryObj);

  //   // Check if a name search term exists
  //   if (queryObj.name) {
  //   queryStr = queryStr.replace(
  //     /"name":(.*?)/,
  //     `"name": { "$regex": /^${JSON.parse(queryStr).name}/i}`
  //   );
  // } else {
  //   // No search term provided, remove any existing name filter
  //   delete queryObj.name;
  //   queryStr = JSON.stringify(queryObj);
  // }

  //   this.query = this.query.find(JSON.parse(queryStr));

  //   return this;
  // }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
}

module.exports = APIFeatures;
