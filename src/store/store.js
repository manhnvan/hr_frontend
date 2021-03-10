import Vue from 'vue'
import Vuex from 'vuex'
import employeeApi from '../apis/employee.api'
import departmentApi from '../apis/department.api'
import roleApi from '../apis/role.api'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        employees: [],
        departments: [],
        roles: [],
        user: null
    },
    getters: {
        employeeList: state => {
            return state.employees
        },
        departmentList: state => {
            return state.departments
        },
        roleList: state => {
            return state.roles
        },
        userInformation: state => {
            return state.user
        }
    },
    mutations: {
        updateEmployeeList(state, payload) {
            state.employees = [...payload.employees]
        },
        updateDepartmentList(state, payload) {
            state.departments = [...payload.departments]
        },
        updateRoleList(state, payload) {
            state.roles = [...payload.roles]
        },
        updateUserInformation(state, payload) {
            state.user = { ...state.user, ...payload }
        }
    },
    actions: {
        async fetchEmployeesData({ commit }) {
            const response = await employeeApi.fetchingAllEmplyee();
            commit('updateEmployeeList', { employees: response.employees })
        },
        async fetchDepartmentData({ commit }) {
            const response = await departmentApi.fetchAllDepartmentInformation()
            commit('updateDepartmentList', { departments: response.departments })
        },
        async fetchRoleData({ commit }) {
            const response = await roleApi.fetchAllRoleInformation()
            commit('updateRoleList', { roles: response.roles })
        },
        async setUserInformation({ commit }, user) {
            commit('updateUserInformation', user)
        }
    }
})