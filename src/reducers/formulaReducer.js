import formulaConstant from "../constants/formulaConstant";

const intialState = {
    titles: [],
    body: [], 
    formulaData: []
}

const formula = (state=intialState, action) => {
    switch (action.type) {
        case formulaConstant.SEND_SELECTED_TO_FORMULA:
            return {
                titles: action.titles,
                body: action.body
            }
        case formulaConstant.SEND_FROM_SURVEY_TO_FORMULA:
            return {
                titles: state.titles,
                body: state.body,
                newTitles: action.attributes,
                formulas: action.formulas
            }
        default:
            return state;
    }
}


export default formula