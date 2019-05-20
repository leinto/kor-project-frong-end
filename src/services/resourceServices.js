import axios from "axios";


const baseUrl = `http://localhost:8080/`

const getResources = () => {
    const localToken = JSON.parse(localStorage.getItem('user')).jwtResponse.token
    const config = { headers: { 'Authorization': "Bearer " + localToken } }
    return axios.get(`${baseUrl}resources`, config).then(res => { return res.data })
}

const addNewColumn = (name) => {
    const localToken = JSON.parse(localStorage.getItem('user')).jwtResponse.token
    const config = { headers: { 'Authorization': "Bearer " + localToken } }
    return axios.post(`${baseUrl}addcol`, { name: name }, config).then(res => { return res.data })
}

const addNewRow = (row) => {
    const localToken = JSON.parse(localStorage.getItem('user')).jwtResponse.token
    const config = { headers: { 'Authorization': "Bearer " + localToken } }
    return axios.post(`${baseUrl}addrow`, { attributes: row }, config).then(res => { return res.data })
}

const addManyCol = (attributesList) => {
    const localToken = JSON.parse(localStorage.getItem('user')).jwtResponse.token
    const config = { headers: { 'Authorization': "Bearer " + localToken } }
    return axios.post(`${baseUrl}addcols`, attributesList, config).then(res => { return res.data })
}

const addManyRow = (resourcesList) => {
    const localToken = JSON.parse(localStorage.getItem('user')).jwtResponse.token
    const config = { headers: { 'Authorization': "Bearer " + localToken } }
    // debugger;
    return axios.post(`${baseUrl}addrows`, resourcesList, config).then(res => { return res.data })
}

export default {
    getResources,
    addNewColumn,
    addNewRow,
    addManyCol,
    addManyRow
}