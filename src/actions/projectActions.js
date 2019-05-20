import projectServices from "../services/projectServices";
import projectConstants from "../constants/projectConstants";


const getAllResourcesByProject = () => {
    const success = projects => { return { type: projectConstants.FETCH_ALL_RESOURCES_BY_PROJECT_SUCCESS, projects } }
    const failure = error => { return { type: projectConstants.FETCH_ALL_RESOURCES_BY_PROJECT_FAILURE, error } }
    return dispatch => {
        projectServices.getAllResourcesByProject()
            .then(projects => dispatch(success(projects)))
            .catch(error => dispatch(failure(error)))
    }
}

const sendSelectedToRightTable = (selectedResources) => {
    return dispatch => {
        dispatch({
            type: projectConstants.SEND_SELECTED_RESOURCES_TO_PRJECTS_RIGHT_TABLE,
            selectedResources
        })
    }
}


export default {
    getAllResourcesByProject,
    sendSelectedToRightTable
}