import React, { Component } from 'react'
import { Col, Row, Button, Table, Form, ButtonGroup, DropdownButton, Dropdown, ButtonToolbar } from "react-bootstrap";
import RightTable from "../right-table/RightTable";
import { connect } from 'react-redux';
import projectActions from "../../actions/projectActions";
import resourceActions from "../../actions/resourceActions";
import { TablePagination } from '@trendmicro/react-paginations';
import { Link } from "react-router-dom";
import { IoMdShareAlt } from "react-icons/io";
import './LeftTable.css'

class LeftTable extends Component {
    state = {
        projectId: 0,
        limit: 10,
        page: 1,
        pageLength: 10,
        tableSelected: []
    }
    componentDidMount() {
        this.props.dispatch(resourceActions.getAllResources())
        this.props.dispatch(projectActions.getAllResourcesByProject())
    }
    componentDidUpdate(prevProps) {
        if (this.props.attributes.length !== prevProps.attributes.length ||
            this.props.projects.length !== prevProps.projects.length) {
            this.props.dispatch(resourceActions.getAllResources())
            this.props.dispatch(projectActions.getAllResourcesByProject())
        }
    }
    handleCheckboxChange = (e) => this.setState({ [e.target.name]: e.target.checked })
    selectAll = (idList) => idList.map(id => this.setState({ [id]: true }))
    clearSelection = (idList) => idList.map(id => this.setState({ [id]: false }))

    sendSelectedToRightTable = (tableSelected) => { this.props.dispatch(projectActions.sendSelectedToRightTable(tableSelected)) }

    render() {
        const { projects, attributes } = this.props
        const resources = projects[this.state.projectId] ? projects[this.state.projectId].resources : []
        let resourcesResolved = []
        resources.map(resource => {
            return resourcesResolved.push({
                id: resource.id,
                resource: JSON.parse(resource.attributes)
            })
        })
        resourcesResolved.sort((a, b) => parseInt(a.id) - parseInt(b.id)) //sort
        const firstNumber = (this.state.page - 1) * this.state.pageLength
        const lastNumber = this.state.page * this.state.pageLength
        const data = resourcesResolved.slice(firstNumber, lastNumber)
        let idList = []
        let selectIdList = []
        let tableSelected = []
        data.map(row => idList.push(row.id))
        for (let ele in this.state) {
            if (this.state[ele] === true) { selectIdList.push(parseInt(ele)) }
        }
        selectIdList.map(id => resourcesResolved.map(row => row.id === id ? tableSelected.push(row) : null))
        return (
            <div>
                <Row>
                    <Col sm={6}>
                        <div className="bigtable-bar">
                            <span>Resource Category</span>
                            <ButtonGroup className="inline float-right">
                                <ButtonToolbar>
                                    <DropdownButton as={ButtonGroup} title="" id="bg-nested-dropdown" size="sm" >
                                        <Dropdown.Item onClick={() => this.selectAll(idList)}>Select All</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.clearSelection(idList)}>Clear Selection</Dropdown.Item>
                                    </DropdownButton>
                                    <Button size="sm" id="transfer-to-right" onClick={() => this.sendSelectedToRightTable(tableSelected)}>
                                        <IoMdShareAlt />
                                    </Button>
                                </ButtonToolbar>
                            </ButtonGroup>
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
                        <Link to='/'>Edit Resources</Link>
                        <TablePagination
                            type="full"
                            page={this.state.page}
                            pageLength={this.state.pageLength}
                            totalRecords={resources.length}
                            onPageChange={({ page, pageLength, totalRecords }) => {
                                this.setState({ page, pageLength, totalRecords })
                            }}
                            prevPageRenderer={() => <i className="fa fa-angle-left">{"<-"}</i>}
                            nextPageRenderer={() => <i className="fa fa-angle-right">{"->"}</i>}
                        />
                    </Col>
                    <RightTable />
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state.gets.attributes && state.projects.projects) {
        const { attributes } = state.gets
        const { projects } = state.projects
        return {
            projects,
            attributes
        };
    }
    else {
        return {
            projects: [],
            attributes: []
        }
    }
}

export default connect(mapStateToProps)(LeftTable);