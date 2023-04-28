import Home from "../pages/Home"
import ManageCategories from "../pages/ManageCategories"
import ManageCustomers from "../pages/ManageCustomers"
import ManageEmployees from "../pages/ManageEmployees"
import ManageOrders from "../pages/ManageOrders"
import ManageProducts from "../pages/ManageProducts"
import ManageSuppliers from "../pages/ManageSuppliers"
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/manageCustomers', component: ManageCustomers },
    { path: '/manageEmployees', component: ManageEmployees },
    { path: '/manageOrders', component: ManageOrders },
    { path: '/manageProducts', component: ManageProducts },
    { path: '/manageCategories', component: ManageCategories },
    { path: '/manageSuppliers', component: ManageSuppliers },
    // { path: '/profile/:nickname', component: Profile},
    // { path: '/upload', component: Upload , layout:DefaultLayoutOnly},
    // { path: '/search', component: Search , layout:null},


]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }