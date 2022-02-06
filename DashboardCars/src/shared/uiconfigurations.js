var alertDismissCountDown = 0;
if (~encodeURIComponent(alertDismissCountDown).indexOf("%23%7B")) {
    alertDismissCountDown = 5;
}

const UIConfigurations = {

    alertDismissCountDown,
    alternateRow(index) {
        if (index % 2 === 0) {
            return "background-color: #EFEFEF";
        } else {
            return "background-color: white";
        }
    },
    alternateRowDarker(index) {
        if (index % 2 === 0) {
            return "background-color: #EAEAEA";
        } else {
            return "background-color: #EFEFEF";
        }
    },
    getPerPageOptionsSM() {
        return [
            { value: 5, text: 5 },
            { value: 10, text: 10 },
            { value: 25, text: 25 }
        ];
    },
    getPerPageOptionsLG() {
        return [
            { value: 20, text: 20 },
            { value: 50, text: 50 },
            { value: 100, text: 100 },
        ]
    },
    getDefaultRefreshIntervalOptions() {
        return [
            { value: 5, text: 5 },
            { value: 10, text: 10 },
            { value: 25, text: 25 },
        ];
    },
    getDefaultZone() {
        return "America/New_York";
    },
    getDefaultYesNoRadioGroup() {
        return [
            { text: "Yes", value: true, key: 1 },
            { text: "No", value: false, key: 2 },
        ];
    },
};

export default UIConfigurations;

