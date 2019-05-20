import resourceConstants from "../constants/resourceConstants";
import resourceServices from "../services/resourceServices";

const getAllResources = () => {
    let resources = []
    let attributes = []
    return dispatch => {
        resourceServices.getResources().then(data => {
            // data.resources.map(row => { return resources[row.id] = JSON.parse(row.attributes) });
            data.resources.map(row => {
                return resources.push({
                    id: row.id,
                    resource: JSON.parse(row.attributes)
                })
            })
            attributes = data.attributes;
            dispatch({
                type: resourceConstants.FETCH_ALL_RESOURCES,
                payload: {
                    resources,
                    attributes
                }
            })
        })
    }
}

const addNewColumn = (name) => {
    const success = attributes => { return { type: resourceConstants.ADD_COLUMN_SUCCESS, attributes } }
    const failure = error => { return { type: resourceConstants.ADD_COLUMN_FAILURE, error } }
    return dispatch => {
        resourceServices.addNewColumn(name)
            .then(attributes => { dispatch(success(attributes)) })
            .catch(error => { dispatch(failure(error)) })
    }
}

const addNewRow = (row) => {
    const success = resources => { return { type: resourceConstants.ADD_ROW_SUCCESS, resources } }
    const failure = error => { return { type: resourceConstants.ADD_ROW_FAILURE, error } }
    return dispatch => {
        resourceServices.addNewRow(row)
            .then(resources => { dispatch(success(resources)) })
            .catch(error => { dispatch(failure(error)) })
    }
}
const addManyCol = (attributesList) => {
    const success = attributes => { return { type: resourceConstants.ADD_MANY_COL_SUCCESS, attributes } }
    const failure = error => { return { type: resourceConstants.ADD_MANY_COL_FAILURE, error } }
    return dispatch => {
        resourceServices.addManyCol(attributesList)
            .then(attributes => { dispatch(success(attributes)) })
            .catch(error => { dispatch(failure(error)) })
    }
} 

const addManyRow = (resourcesList) => {
    const success = resources => { return { type: resourceConstants.ADD_MANY_ROW_SUCCESS, resources } }
    const failure = error => { return { type: resourceConstants.ADD_MANY_ROW_FAILURE, error } }
    return dispatch => {
        resourceServices.addManyRow(resourcesList)
            .then(resources => { dispatch(success(resources)) })
            .catch(error => { dispatch(failure(error)) })
    }
}



export default {
    getAllResources, 
    addNewColumn, 
    addNewRow, 
    addManyCol, 
    addManyRow
}