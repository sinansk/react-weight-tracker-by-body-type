export const convertDateToIso = (date) => {
    const dateArray = date.split('-');
    const isoDate = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
    return isoDate;
}