import http from './http'

const departmentApi = {
    fetchAllDepartmentInformation: async () => {
        try {
            const response = await http.get('departments')
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default departmentApi