const checkNotNullData = (data) => {
  if (typeof data !== 'undefined' && data !== null) {
    return true;
  } else {
    return false;
  }
};
export default checkNotNullData;
