

let HttpHelper = {
    async GetContentRange(headers) {
        //need to transform into Array of Objects
        var headerArr = Object.entries(headers);
        //need to go through the array and get content-range
        var headerValue = "";
        for (let [key, value] of headerArr) {
            // console.log(`${key}: ${value}`);
            if (key === "content-range") {
                headerValue = value;
            }
        }
        try {
            return this.parseContentRangeHeader(headerValue);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },

    parseContentRangeHeader(headerValue) {

        if (headerValue == null || headerValue === "") {
            return;
        }

        let unitSeparator = headerValue.indexOf(' ')

        if (unitSeparator === -1) {
            throw new Error('missing unit separator')
        }

        let unit = headerValue.substr(0, unitSeparator)

        if (unit.length === 0) {
            throw new Error('missing unit value')
        }

        let sizeSeparator = headerValue.indexOf('/', unitSeparator + 1)

        if (sizeSeparator === -1) {
            throw new Error('missing size separator')
        }

        let rangeSeparator = headerValue.indexOf('-', unitSeparator + 1)

        let range
        let isRangeSatisfied

        if (rangeSeparator > -1) {
            let rangeStart = parseInt(headerValue.substring(unitSeparator + 1, rangeSeparator))
            if (isNaN(rangeStart)) {
                throw new Error('invalid range start value')
            }

            let rangeEnd = parseInt(headerValue.substring(rangeSeparator + 1, sizeSeparator))
            if (isNaN(rangeEnd)) {
                throw new Error('invalid range end value')
            }

            if (rangeStart > rangeEnd) {
                // throw new Error('range start is greater than range end')
                rangeEnd = rangeStart;
            }

            range = { start: rangeStart, end: rangeEnd }
            isRangeSatisfied = true
        } else {
            range = headerValue.substring(unitSeparator + 1, sizeSeparator)
            if (range !== '*') {
                throw new Error('invalid range')
            }

            isRangeSatisfied = false
        }

        let size = headerValue.substring(sizeSeparator + 1)
        let isSizeKnown

        if (size === '*') {
            isSizeKnown = false

        } else {
            size = parseInt(size)
            if (isNaN(size)) {
                throw new Error('invalid size value')
            }
            isSizeKnown = true
        }

        return { range, isRangeSatisfied, unit, size, isSizeKnown }

    },
    
    async handleResult(result) {
        var newResult = new Object();
        newResult.httpStatus = result.status;
        newResult.httpStatusText = result.statusText;
        newResult.errorMessage = "";
        newResult.stackErrorMessages = [];
        newResult.isInError = false;
        // newResult.title = "(" + newResult.httpStatus + ") " + newResult.httpStatusText;
        newResult.title = "Error";
        
        if (newResult.httpStatus >= 400) {
            newResult.isInError = true;
            if (result.data.errors != null) {
                if (result.data.errors.length > 0) {
                    newResult.errorMessages = result.data.errors;
                }
            }
        }
        
        if (!newResult.isInError) newResult.data = result.data;

        if (newResult.httpStatus == 400) {
            newResult.errorMessage = "The server cannot or will not process the request due to an apparent client error.";

            if (result.data != null && result.data.errors != null)
                newResult.errorMessage = result.data.errors.join(' ');
        }
        if (newResult.httpStatus == 401) {
            newResult.errorMessage = "The server did not process your request due to lack of authentication.";
        }
        if (newResult.httpStatus == 403) {
            newResult.errorMessage = "The server did not process your request due to unauthorized access.";
        }
        if (newResult.httpStatus == 404) {
            newResult.errorMessage = "The requested resource could not be found.";
        }
        if (newResult.httpStatus == 500) {
            newResult.errorMessage = "Server error. This request could not be processed due to unhandled exception.";
        }
        if (newResult.httpStatus == 503) {
            newResult.errorMessage = "The server cannot handle the request (because it is overloaded or down for maintenance).";
        }

        newResult.headers = result.headers;
        newResult.contentRange = await this.GetContentRange(result.headers);
        
        return new Promise(r => r(newResult));
    }
};

export default {
    ...HttpHelper
};