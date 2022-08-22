const moment = require('moment');

class RandomKeyUtils {

    static randomInt(low, high) {

        return Math.floor(Math.random() * (high - low + 1) + low);

    };

    static Percentage(partialValue, totalValue) {

        return (100 * partialValue) / totalValue;

    };

    numberFormat(num) {

        return (
            num
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        )

    };

    convertToFahrenheit(celsius) {

        return celsius * 9 / 5 + 32
		
    };

    formatNumberK(number) {
		
        return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
		
    };


    shorten(text, maxLen = 2000) {

        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;

    };

    sortByName(arr, prop) {

        return arr.sort((a, b) => {
			
            if (prop) return a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1;
            return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
			
        });
		
    };

    findArrayDuplicates(arr) {

        return arr.filter((value, index) => {
            return arr.indexOf(value) !== index
        });

    };

    formatDuration(duration) {

        return moment.duration(duration).format('hh:mm:ss', { stopTrim: 'm' });

    };

    capitalizeFirstLetter(string, everyWord = false) {

        const capitalizeWord = w => w.charAt(0).toUpperCase() + w.slice(1)

        if (everyWord) return string.split(' ').map(capitalizeWord).join(' ')

        return capitalizeWord(string)

    };

    resolveInviteCode(data) {
		
        //const inviteRegex = /discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i;
        const inviteRegex = /https?:\/\/discord.gg\/(?:invite|user\/\w+\/server\/\d+)/i
        const match = inviteRegex.exec(data);
        if (match && match[1]) return match[1];
        return data;
		
    };
    
    list(arr, conj = 'and') {
		
            const len = arr.length;
            if (len === 0) return '';
            if (len === 1) return arr[0];
            return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
		
    };


    today(timeZone) {
		
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
        return now;
		
    };

    tomorrow(timeZone) {
		
        const today = Util.today(timeZone);
        today.setDate(today.getDate() + 1);
        return today;
		
    };

    trimArray(arr, maxLen = 10) {
		
        if (arr.length > maxLen) {
			
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
			
        };
		
        return arr;
		
    };
	
};

module.exports = new RandomKeyUtils;