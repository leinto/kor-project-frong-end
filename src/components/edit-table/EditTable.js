import React, { Component } from 'react'
import { Table, Row, Button, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { TablePagination } from '@trendmicro/react-paginations';
import { Link } from "react-router-dom";
import "./EditTable.css"


class EditTable extends Component {
    state = {
        limit: 10,
        page: 1,
        pageLength: 10
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    getCompleteFormula(titlesTwo, formulas, state, index) {
        let formula = Object.values(formulas[0])[0] || ''
        titlesTwo.map(title => {
            const titlesThree = titlesTwo.slice()
            titlesThree.pop()
           return  titlesThree.map(title => formula = formula.replace(`${title}`, `${state[`${title}${index}`] || ''}`))
        })
        return formula
    }

    render() {
        const { titles, body, newTitles, formulas } = this.props
        let titlesTwo = []
        newTitles.map(ele => titles.includes(ele) ? null : titlesTwo.push(ele))
        let formulaKeys = []
        formulas.map(ele => formulaKeys.push(Object.keys(ele)[0]))

        // console.log(formulaKeys);        
        return (
            <div>
                <div className="bigtable-bar">
                    Quantity Survey
                </div>
                <Table responsive className="big-table">
                    <thead className="big-table-thead">
                        <tr>
                            {titles.map((title, index) => { return <th key={index}>{title}</th> })}
                            {titlesTwo.map((title, index) => { return <th key={index}>{title}</th> })}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((row, index) => {
                            return <tr key={index}>
                                {titles.map((title, i) => {
                                    return <td key={i}>
                                        <input
                                            className="editableCell"
                                            name={row[title]}
                                            value={this.state[row[title]]
                                                ? this.state[row[title]]
                                                : row[title]}
                                            onChange={(e) => this.handleChange(e)} />
                                    </td>
                                })}
                                {
                                    titlesTwo.map((title, i) => {
                                        let formula = Object.values(formulas[0])[0] || ''
                                        formula = this.getCompleteFormula(titlesTwo, formulas, this.state, index)
                                        let result = ''
                                        try { result = eval(formula) } catch (error) { }
                                        console.log(result);
                                        if (!formulaKeys.includes(title)) {
                                            return <td key={i}>
                                                <input className="editableCell"
                                                    name={`${title}${index}`}
                                                    value={this.state[`${title}${index}`]
                                                        ? this.state[`${title}${index}`]
                                                        : ''}
                                                    onChange={(e) => this.handleChange(e)} />
                                            </td>
                                        } else {
                                            return <td key={i}>
                                                <input className="editableCell"
                                                    name={`${title}${index}`}
                                                    placeholder={result === '' ? '' : result}
                                                />
                                            </td>
                                        }
                                    })
                                }
                            </tr>
                        })}
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <Link to="/survey">Edit Quantity Survey Tempalte</Link>
                    </Col>
                    <Col id="edit-submit">
                        <Button id="edit-submit-button">Submit</Button>
                    </Col>
                </Row>
                {body.length > 10 ?
                    <TablePagination
                        type="full"
                        page={this.state.page}
                        pageLength={this.state.pageLength}
                        totalRecords={body.length}
                        onPageChange={({ page, pageLength, totalRecords }) => {
                            this.setState({ page, pageLength, totalRecords })
                        }}
                        prevPageRenderer={() => <i className="fa fa-angle-left">{"<-"}</i>}
                        nextPageRenderer={() => <i className="fa fa-angle-right">{"->"}</i>}
                    /> : null}
            </div>
        )
    }
}


function mapStateToProps(state) {
    if (state.formula) {
        return {
            titles: state.formula.titles,
            body: state.formula.body,
            newTitles: state.formula.newTitles ? state.formula.newTitles : [],
            formulas: state.formula.formulas ? state.formula.formulas : []
        };
    }
    else {
        return {
            titles: [],
            body: [],
            newTitles: [],
            formulas: []
        }
    }
}


export default connect(mapStateToProps)(EditTable);