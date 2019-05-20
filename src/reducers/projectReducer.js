import projectConstants from "../constants/projectConstants";

const initialState = {
    attributes: []
}
 

const project = (state = initialState, action) => {
    switch (action.type) {
        case projectConstants.FETCH_ALL_RESOURCES_BY_PROJECT_SUCCESS:
            return {
                projects: action.projects
            }
        case projectConstants.FETCH_ALL_RESOURCES_BY_PROJECT_FAILURE:
            return state
        case projectConstants.SEND_SELECTED_RESOURCES_TO_PRJECTS_RIGHT_TABLE:
            return {
                projects: state.projects,
                selected: action.selectedResources
            }
        default:
            return state
    }
}

export default project