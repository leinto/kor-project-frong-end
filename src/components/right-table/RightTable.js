import React, { Component } from 'react'
import { Col, Table, Form, Button, ButtonToolbar } from "react-bootstrap";
import { connect } from 'react-redux';
import { TablePagination } from '@trendmicro/react-paginations';
import { Link } from "react-router-dom";
import formulaActions from "../../actions/formulaActions";
import { IoMdTrash } from "react-icons/io";
import './RightTable.css'


class RightTable extends Component {
    state = {
        limit: 10,
        page: 1,
        pageLength: 10
    }
    handleCheckboxChange = (e) => this.setState({ [e.target.name]: e.target.checked })
    clearSelection = (idList) => idList.map(id => this.setState({ [id]: false }))
    sendResourceToFormula = (titles, body) => {
        this.props.dispatch(formulaActions.sendDataToFormula(titles, body))
    }
    render() {
        const attributes = this.props.attributes
        const data = this.props.selected
        let selectIdList = []
        for (let ele in this.state) {
            if (this.state[ele] === true) { selectIdList.push(parseInt(ele)) }
        }
        const titles = ["cost_code", "name"]
        let body = []
        // eslint-disable-next-line array-callback-return
        data.map(row => {
            if (selectIdList.includes(row.id)) {
                let item = {}
                titles.map(title => item[title] = row.resource[title])
                body.push(item)
            }
        })
        return (
            <Col sm={6}>
                <div className="bigtable-bar">
                    <ButtonToolbar className="justify-content-between">
                        <span>Project</span>
                        <Button id="clear-anything-in-the-table-button" onClick={() => this.clearSelection(selectIdList)} size="sm"><IoMdTrash /></Button>
                    </ButtonToolbar>
                </div>
                <Table responsive className="big-table">
                    <thead className="big-table-thead">
                        <tr>{attributes.map(attribute => { return <th key={attribute.id}>{attribute.name}</th> })}</tr>
                    </thead>
                    <tbody>
                        {data.map(row => {
                            return (
                                <tr key={row.id}>
                                    {attributes.map((attribute, index) => {
                                        return (
                                            <td key={attribute.id}>
                                                {index === 0 ?
                                                    <Form.Check
                                                        type="checkbox"
                                                        inline
                                                        label={row.resource[attribute.name]}
                                                        name={row.id}
                                                        checked={!!this.state[row.id]}
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                    : row.resource[attribute.name]}
                                            </td>)
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {body.length > 0 ? 
                    <Link to="/formula">
                        <div className="project-submit">
                            <Button id="project-submit-button" onClick={() => this.sendResourceToFormula(titles, body)}>Submit</Button>
                        </div>
                    </Link> : null}
                {data.length > 10 ?
                    <TablePagination
                        type="full"
                        page={this.state.page}
                        pageLength={this.state.pageLength}
                        totalRecords={data.length}
                        onPageChange={({ page, pageLength, totalRecords }) => {
                            this.setState({ page, pageLength, totalRecords })
                        }}
                        prevPageRenderer={() => <i className="fa fa-angle-left">{"<-"}</i>}
                        nextPageRenderer={() => <i className="fa fa-angle-right">{"->"}</i>}
                    /> : null}
            </Col>
        )
    }
}

function mapStateToProps(state) {
    if (state.projects.selected) {
        return {
            selected: state.projects.selected,
            attributes: state.gets.attributes
        };
    }
    else {
        return {
            selected: [],
            attributes: state.gets.attributes
        }
    }
}


export default connect(mapStateToProps)(RightTable)