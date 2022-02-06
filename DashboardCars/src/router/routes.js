// import Home from "@/views/Home.vue";
import UnderConstruction from "@/layout/UnderConstruction.vue";
import CarsHome from "../views/Cars.vue";



export const routes = [
    {
        path: "",
        name: "carsHome",
        components: {
            default: CarsHome
        },
    },
    {
        path: '/underconstruction',
        name: 'underconstruction',
        component: UnderConstruction,
    },
    { //fail over
        path: '*',
        redirect: '/',
        components: {
            default: CarsHome
        }
    }
];



/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;