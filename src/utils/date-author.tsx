export const UserDate = (date: string) => {
  const res = new Date(date);
  const monthsName = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const month = monthsName[res.getMonth()];
  const dates = res.getDate();
  const yeart = res.getFullYear();
  return `${month} ${dates}, ${yeart}`;
};
