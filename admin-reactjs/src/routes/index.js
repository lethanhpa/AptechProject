import Home from "../pages/Home"
import ManageCategorys from "../pages/ManageCategorys"
import ManageCustomers from "../pages/ManageCustomers"
import ManageEmployees from "../pages/ManageEmployees"
import ManageOrders from "../pages/ManageOrders"
import ManageProducts from "../pages/ManageProducts"
import ManageSuplliers from "../pages/ManageSuplliers"
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/manageCustomers', component: ManageCustomers },
    { path: '/manageEmployees', component: ManageEmployees },
    { path: '/manageOrders', component: ManageOrders },
    { path: '/manageProducts', component: ManageProducts },
    { path: '/manageCategorys', component: ManageCategorys },
    { path: '/manageSuplliers', component: ManageSuplliers },
    // { path: '/profile/:nickname', component: Profile},
    // { path: '/upload', component: Upload , layout:DefaultLayoutOnly},
    // { path: '/search', component: Search , layout:null},


]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }