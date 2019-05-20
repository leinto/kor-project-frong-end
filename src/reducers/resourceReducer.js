import resourceConstants from "../constants/resourceConstants";

const initialState = {
    resources: [],
    attributes: []
}

const resource = (state = initialState, action) => {
    switch (action.type) {
        case resourceConstants.FETCH_ALL_RESOURCES:
            return {
                resources: action.payload.resources,
                attributes: action.payload.attributes
            }
        case resourceConstants.ADD_COLUMN_SUCCESS:
            return {
                resources: state.resources,
                attribtues: action.attributes
            }
        case resourceConstants.ADD_COLUMN_FAILURE:
            return state;
        case resourceConstants.ADD_ROW_SUCCESS:
            return {
                resources: action.resources,
                attribtues: state.attributes
            }
        case resourceConstants.ADD_ROW_FAILURE:
            return state;

        case resourceConstants.ADD_MANY_COL_SUCCESS:
            return {
                resources: state.resources,
                attributes: action.attributes
            }
        case resourceConstants.ADD_MANY_COL_FAILURE:
            return state;

        case resourceConstants.ADD_MANY_ROW_SUCCESS:
            return {
                resources: action.resources,
                attribtues: state.attributes
            }
        case resourceConstants.ADD_MANY_ROW_FAILURE:
            return state;
        default:
            return state;
    }
}


export default resource;