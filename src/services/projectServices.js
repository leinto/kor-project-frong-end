import axios from "axios";


const baseURL = `http://localhost:8080/`

const getAllResourcesByProject = () => {
    const localToken = JSON.parse(localStorage.getItem('user')).jwtResponse.token
    const config = { headers: { 'Authorization': "Bearer " + localToken } } 
    return axios.get(`${baseURL}allProjects`, config).then(res => res.data)
}



export default {
    getAllResourcesByProject

}