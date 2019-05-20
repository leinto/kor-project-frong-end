import React, { Component } from 'react'
import { Table, Row, Form, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import formulaActions from "../../actions/formulaActions";
import './SurveyTable.css';
import { IoIosTrash } from "react-icons/io";
import { FiPlus } from "react-icons/fi";




class SurveyTable extends Component {
    state = {
        name: true,
        editingArea: [],
        fieldList: [],
        typeList: [],
        formulaList: [],
        attributesList: []
    }

    handleCheckboxChange = e => {
        if (e.target.name !== "name") this.setState({ [e.target.name]: e.target.checked })
    }
    handleChange = (e) => {
        const id = this.state.editingArea.length
        if (e.target.name.slice(0, 2) === "fi") {
            const fieldName = `field${id}`
            let fieldList = this.deleteOld(this.state.fieldList, fieldName)
            fieldList.push({ [fieldName]: e.target.value })
            this.setState({ fieldList: fieldList })

        } else if (e.target.name.slice(0, 2) === "ty") {
            const typeName = `type${id}`
            let typeList = this.deleteOld(this.state.typeList, typeName)
            typeList.push({ [typeName]: e.target.value })
            this.setState({ typeList: typeList })

        } else if (e.target.name.slice(0, 2) === "fo") {
            const formulaName = `formula${id}`
            let formulaList = this.deleteOld(this.state.formulaList, formulaName)
            formulaList.push({ [formulaName]: e.target.value })
            this.setState({ formulaList: formulaList })
        }
    }

    deleteOld = (list, name) => {
        let listNew = list.slice()
        list.map((ele, index) => {
            if (ele[name]) {
                if (index === 0) {
                    listNew = list.slice(1)
                    return listNew
                } else {
                    const listNewPartOne = list.slice(0, index)
                    const listNewPartTwo = list.slice(index + 1)
                    listNew = [...listNewPartOne, ...listNewPartTwo]
                    return listNew
                }
            }
        })
        return listNew
    }

    clearThisRow = (id) => {
        let editingArea = this.state.editingArea
        if (id === 1) {
            editingArea = editingArea.slice(1)
        } else {
            const partOne = editingArea.slice(0, id)
            const partTwo = editingArea.slice(id+1)
            editingArea = [...partOne, ...partTwo]
        }
        this.setState({editingArea: editingArea})
    }

    addNewRow = () => {
        const id = this.state.editingArea.length
        const row = (
            <div className="new-field-row" key={id}>
                <Row>
                    <Col className="new-field-col">
                        <div>Fields</div>
                        <input className="new-field-input" type="text" name={`field${id}`} onChange={(e) => this.handleChange(e)} />
                    </Col>
                    <Col className="new-field-col">
                        <div>Types:</div>
                        <select name={`type${id}`} onChange={this.handleChange}>
                            <option>Choose...</option>
                            <option value="number">number</option>
                            <option value="text">text</option>
                            <option value="formula">formula</option>
                        </select>
                    </Col>
                    <Col className="new-field-col">
                        <div>Formula:</div>
                        <input className="new-field-input" type="text" name={`formula${id}`} onChange={this.handleChange} />
                    </Col>
                    <Col className="new-field-button">
                        <button id="new-field-button-trash" onClick={() => this.clearThisRow(id)}><IoIosTrash /></button>
                    </Col>
                </Row>
            </div>)
        const editingArea = [...this.state.editingArea, row]
        this.setState({ editingArea: editingArea })
    }

    handleSubmit = () => {
        let attributes = Object.keys(this.state)
        let attributesResolved = []
        attributes.map(ele => ele !== "editingArea"
            && ele !== "fieldList"
            && ele !== "typeList"
            && ele !== "formulaList"
            && ele !== "attributesList" ?
            attributesResolved.push(ele)
            : null)
        this.setState({ attributesList: attributesResolved })
        let formulaListResolved = []
        this.state.formulaList.map(formula => {
            const num = Object.keys(formula)[0].slice(-1) || 0
            const name = this.state.fieldList[num - 1][`field${num}`] 
            return formulaListResolved.push({ [name]: Object.values(formula)[0] })
        })
        this.state.fieldList.map(ele => attributesResolved.push(Object.values(ele)[0]))
        this.props.dispatch(formulaActions.sendToFormulaFromSurvey(attributesResolved, formulaListResolved))
        // console.log(formulaListResolved);
        // console.log(this.state.fieldList);
    }
    render() {
        // console.log(this.state);

        const { titles } = this.props
        return (
            <div>
                <Row>
                    <Col sm={4} className="survey-containter">
                        <div className="bordered">
                            <div className="survey-bar">Project Scope Fields</div>
                            <Table responsive striped bordered>
                                <tbody>
                                    {titles.map((title, index) => {
                                        return (
                                            <tr key={index}><td>{title}</td>
                                                <td><Form.Check
                                                    type="checkbox"
                                                    inline name={title}
                                                    checked={!!this.state[title]}
                                                    onChange={(e) => this.handleCheckboxChange(e)} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col sm={8} className="survey-containter">
                        <div className="survey-bar">Quantity Survey Fields</div>
                        {this.state.editingArea}
                        <div className="new-field-add">
                            <span>Add Fields</span>
                            <button id="new-field-button-add" onClick={this.addNewRow}><FiPlus /></button>
                        </div>
                    </Col>
                </Row>
                <div className="new-field-save">
                    <button className="new-field-save-button" onClick={() => this.handleSubmit()}>Save</button>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    if (state.formula) {
        return {
            titles: state.formula.titles
        };
    }
    else {
        return {
            titles: []
        }
    }
}

export default connect(mapStateToProps)(SurveyTable)