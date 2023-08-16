module.exports = (startDate, endDate) => {
    const dateList = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateList.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
}