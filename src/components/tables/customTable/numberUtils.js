export const formatNumber = (number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const numString = number.toString();
    let result = '';
    let count = 0;

    for (let i = numString.length - 1; i >= 0; i--) {
        result = persianDigits[parseInt(numString[i])] + result;
        count++;
        if (count === 3 && i !== 0) {
            result = ',' + result;
            count = 0;
        }
    }

    return result;
};


export const formatNumberWithoutComma = (number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const numString = number.toString();
    let result = '';

    for (let i = 0; i < numString.length; i++) {
        result += persianDigits[parseInt(numString[i])];
    }

    return result;
};


export const convertToPersianDateTime = (dateTimeString) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    const dateTimeParts = dateTimeString.split(' ');
    const dateParts = dateTimeParts[0].split('/');
    const timeParts = dateTimeParts[1].split(':');

    const persianYear = formatNumberWithoutComma(parseInt(dateParts[0]));
    const persianMonth = formatNumberWithoutComma(parseInt(dateParts[1]));
    const persianDay = formatNumberWithoutComma(parseInt(dateParts[2]));
    const persianHour = formatNumberWithoutComma(parseInt(timeParts[0]));
    const persianMinute = formatNumberWithoutComma(parseInt(timeParts[1]));
    const persianSecond = formatNumberWithoutComma(parseInt(timeParts[2]));

    const persianDateTimeString = `${persianYear}/${persianMonth}/${persianDay} - ${persianHour}:${persianMinute}:${persianSecond}`;

    return persianDateTimeString;
};
