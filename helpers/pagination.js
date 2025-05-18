module.exports = async (query, quantilyItem, model) => {
  const countItemInDb = await model.countDocuments({deleted: false})
  var objectPagination = {
    currentPage: 1,
    quantilyItem: quantilyItem,
    totalPage: Math.ceil(countItemInDb / quantilyItem)
  }; 
  if (query.page) {
    const currentPageUrl = parseInt(query.page);
    objectPagination.currentPage = currentPageUrl;
  }
  return objectPagination;
};
