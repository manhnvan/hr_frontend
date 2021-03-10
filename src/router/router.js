import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from '../components/Layout/AdminLayout'
import EmployeeLayout from '../components/Layout/EmployeeLayout'
import Login from '../components/Layout/Login'
import roleApi from '../apis/role.api'

Vue.use(VueRouter)

const routes = [
    {
        name: 'admin',
        path: '/admin',
        component: AdminLayout,
        // eslint-disable-next-line no-unused-vars
        beforeEnter: async (to, from, next) => {
            roleApi.checkRoleFromToken().then(response => {
                if (!response.auth || response.role !== 7) {
                    return next('login')
                }
                return next()
            })
        }
    },
    {
        name: 'employee',
        path: '/employee',
        component: EmployeeLayout,
        beforeEnter: async (to, from, next) => {
            roleApi.checkRoleFromToken().then(response => {
                if (!response.auth || response.role === 7) {
                    return next('login')
                }
                return next()
            })
        }
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    }
]

export const router = new VueRouter({
    routes
})