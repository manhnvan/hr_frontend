import http from './http'

const EmployAPI = {
    fetchingAllEmplyee: async () => {
        try {
            const response = await http.get("employees")
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    },
    createNewEmployee: async (employee) => {
        try {
            const response = await http.post("employees", employee)
            return response.data
        } catch (error) {
            return error.response.data
        }
    },
    updateEmployeeInformation: async (id, updatedInformation) => {
        try {
            const response = await http.put("employees/" + id, updatedInformation)
            return response.data
        } catch (error) {
            return error.response.data
        }
    },
    deleteEmployeeInformation: async (id) => {
        try {
            const response = await http.delete("employees/" + id)
            return response.data
        } catch (error) {
            return error.response.data
        }
    },
    login: async (email, password, captcha) => {
        try {
            const response = await http.post("employees/login", { email, password, captcha })
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
}

export default EmployAPI
