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

export function convertToPersianNumbers(gregorianDate) {
    const persianNumbersMap = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
    };

    const persianDate = gregorianDate.replace(/[0-9]/g, (number) => persianNumbersMap[number]);

    return persianDate;
}
