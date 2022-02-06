import CarsService from "../../services/carsApiService";

const namespaced = true;
const state = {};
const mutations = {};
const actions = {
    async getCarsData(context, criteria) {
        return await CarsService.GetCarsData(criteria);
    }
};
const getters = {};


export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
};