const StringExtension = {
    IsNullOrWhiteSpace(input) {
        try {
            if (typeof input === 'undefined' || input === null) return true;

            return String(input).replace(/\s/g, '').length < 1;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
};

export default StringExtension;