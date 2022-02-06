const CarsService = {
    async GetCarsData(criteria) {

        //MOCK DATA - Normally this should be given by the API
        var handlerResult = new Object();
        handlerResult.contentRange = 1;
        var data = [];
        var dataItem = new Object();
        dataItem.colors = [
            { id: 1, text: "red", src: "/img/somecars/redRav.jpg", value: "#FF0000" },
            { id: 2, text: "black", src: "/img/somecars/blackRav.jpg", value: "#000000" },
            { id: 3, text: "white", src: "/img/somecars/whiteRav.jpg", value: "#FFFFFF" }
        ];
        dataItem.model = { id: 2, text: "Rav4" };
        dataItem.maker = { id: 2, text: "Toyota" };
        dataItem.year = 2019;
        dataItem.Id = "0dfc8cfc-2432-45cd-8723-47594e880ac2";
        dataItem.description = "";
        dataItem.usedMiles = 4000;
        dataItem.price = 34100.00;
        dataItem.priceBefore = 36900.00;
        dataItem.inStock = true;
        dataItem.defaultImage = dataItem.colors[0].src;
        dataItem.tempImage = dataItem.colors[0].src;
        dataItem.clickedColor = null;

        data.push(dataItem);

        if (criteria) {
            data = data.filter((obj) => {
                return (obj.maker.id == criteria.makerId || criteria.makerId == null) &&
                    (obj.model.id == criteria.modelId || criteria.modelId == null) &&
                    (obj.year == criteria.year || criteria.year == null);
            });
        }

        handlerResult.data = data;
        handlerResult.errorMessage = "";
        handlerResult.httpStatus = 200;
        handlerResult.httpStatusText = "OK";
        handlerResult.isInError = false;
        handlerResult.stackErrorMessages = [];
        handlerResult.title = "Error"

        return new Promise((resolve) => resolve(handlerResult));
    },

    async GetModels() {
        var handlerResult = new Object();
        handlerResult.contentRange = 1;
        var data = [];
        var dataItem = new Object();
        dataItem = [
            { id: 1, makerId: 2, text: "Prius" },
            { id: 2, makerId: 2, text: "Rav4" },
            { id: 3, makerId: 2, text: "Corolla" },
            { id: 4, makerId: 3, text: "Silverado" },
        ];

        data.push(dataItem);

        handlerResult.data = data;
        handlerResult.errorMessage = "";
        handlerResult.httpStatus = 200;
        handlerResult.httpStatusText = "OK";
        handlerResult.isInError = false;
        handlerResult.stackErrorMessages = [];
        handlerResult.title = "Error"

        return new Promise((resolve) => resolve(handlerResult));
    },

    async GetMakers() {
        var handlerResult = new Object();
        handlerResult.contentRange = 1;
        var data = [];
        var dataItem = new Object();
        dataItem = [
            { id: 1, text: "Scion" },
            { id: 2, text: "Toyota" },
            { id: 3, text: "GM" }
        ];

        data.push(dataItem);

        handlerResult.data = data;
        handlerResult.errorMessage = "";
        handlerResult.httpStatus = 200;
        handlerResult.httpStatusText = "OK";
        handlerResult.isInError = false;
        handlerResult.stackErrorMessages = [];
        handlerResult.title = "Error"

        return new Promise((resolve) => resolve(handlerResult));
    },

    async GetYears() {
        var result = [2022, 2021, 2020, 2019];
        return new Promise((resolve) => resolve(result));
    },
};

export default CarsService;