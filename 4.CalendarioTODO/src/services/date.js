export const uniqueDates = (tasks) => {
  const dates = [];

  tasks.forEach((task) => {
    const date = moment(task.date).format("DD/MM/YY");
    if (!dates.includes(date)) {
      dates.push(date);
    }
  });

  return dates;
};
