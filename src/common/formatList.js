const formatList = ({listData = [], colorState = {}}) => {
  const newList = [...listData];
  newList.forEach((item) => {
    item.state.color = colorState[item.state.key];
  });
  return newList;
};

export default formatList;
