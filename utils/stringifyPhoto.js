function stringifyPhoto(item) {
  item.photo = String(item.photo);
  return item;
}

module.exports = {
  stringifyPhoto,
};
