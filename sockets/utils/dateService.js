// Converte a hora do formato 24 para 12 AM/PM
const convertHourToShapeAmPm = () => {
  const now = new Date();
  const hour = `${now.getHours()}`;
  const min = `${now.getMinutes()}`;
  const seg = `${now.getSeconds()}`;

  if (hour >= 12) { return (`${hour - 12}:${min}:${seg} PM`); }
    return (`${hour}:${min}:${seg} AM`);
};

// Converte a data para o formato usado no brasil
const dateConvertBrasilAMPM = () => {
  const now = new Date();
  const str = `${now
    .getDate()}-${now
      .getMonth() + 1}-${now
        .getFullYear()} ${convertHourToShapeAmPm()}`;
  return str;
};

module.exports = { dateConvertBrasilAMPM };
