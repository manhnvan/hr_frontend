import http from './http'

const roleApi = {
    fetchAllRoleInformation: async () => {
        try {
            const response = await http.get('roles')
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    },
    checkRoleFromToken: async () => {
        try {
            const response = await http.get('roles/roleFromToken')
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default roleApi