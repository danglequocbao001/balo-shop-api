exports.groupDataByDate = async (data, type) => {
  const result = [];
  const groups = {};
  data.forEach((item) => {
    let date;
    let name;
    switch (type) {
      case "day":
        date = item.ngay.split("-");
        name = `${date[2]}-${date[1]}`;
        break;
      case "month":
        date = item.ngay.split("-");
        name = `${date[1]}-${date[0]}`;
        break;
      case "year":
        date = item.ngay.split("-");
        name = date[0];
        break;
      default:
        throw new Error("Invalid type");
    }
    if (!groups[name]) {
      groups[name] = { sum: 0 };
      result.push({ name, tong_thu: 0 });
    }
    groups[name].sum += item.tong_thu;
    result.find((obj) => obj.name === name).tong_thu = groups[name].sum;
  });
  return result;
};
