const num_to_month = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const convertDate = (date) => {
  var month_num = date.split("-")[1];
  var final_date = `${date.split("-")[2]} ${num_to_month[month_num]} ${
    date.split("-")[0]
  }`;
  return final_date;
};

export { convertDate };
