import formulaConstant from "../constants/formulaConstant";
import history from "../utilities/history"



const sendDataToFormula = (titles, body) => {
    return dispatch => {
        dispatch({
            type: formulaConstant.SEND_SELECTED_TO_FORMULA,
            titles: titles,
            body: body
        })
    }
}

const sendToFormulaFromSurvey = (attributes, formulas) => {
    return dispatch => {
        dispatch({
            type: formulaConstant.SEND_FROM_SURVEY_TO_FORMULA,
            attributes: attributes,
            formulas: formulas
        })
        history.push('/formula')
        
    }
}



export default {
    sendDataToFormula, 
    sendToFormulaFromSurvey
}