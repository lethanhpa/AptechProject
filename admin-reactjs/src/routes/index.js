
import ManageCategories from "../pages/ManageCategories"
import ManageCustomers from "../pages/ManageCustomers"
import ManageEmployees from "../pages/ManageEmployees"
import ManageOrders from "../pages/ManageOrders"
import ManageProducts from "../pages/ManageProducts"
import ManageSuppliers from "../pages/ManageSuppliers"
const publicRoutes = [
    { path: '/', component: ManageEmployees },
    { path: '/manageCustomers', component: ManageCustomers },
    { path: '/manageOrders', component: ManageOrders },
    { path: '/manageProducts', component: ManageProducts },
    { path: '/manageCategories', component: ManageCategories },
    { path: '/manageSuppliers', component: ManageSuppliers },
]
const privateRoutes = [
]
export { publicRoutes, privateRoutes }