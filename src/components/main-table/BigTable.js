/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { ButtonToolbar, Button, Table, Modal, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import resourceActions from '../../actions/resourceActions'
import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-paginations/dist/react-paginations.css';
import CSVReader from 'react-csv-reader'
import './BigTable.css'
import { FiSearch } from "react-icons/fi";
import { IoIosCheckmarkCircle, IoIosCloseCircle  } from "react-icons/io";



class BigTable extends Component {


    state = {
        value: null,
        modalShow: false,
        limit: 10,
        page: 1,
        pageLength: 10,
        newRowShow: false,
        newRow: {},
        csvModalShow: false,
        newAttributesResolved: null,
        newResourcesResolved: null,
        submitButtonShow: false,
        keyword: ''
    }
    newRowResolved = {}
    componentDidMount() {
        this.props.dispatch(resourceActions.getAllResources())
    }

    componentDidUpdate(prevProps) {
        if (this.props.attributes.length !== prevProps.attributes.length ||
            this.props.resources.length !== prevProps.resources.length) {
            this.props.dispatch(resourceActions.getAllResources())
        }
    }

    modalClose = () => this.setState({ modalShow: false })
    modalShow = () => this.setState({ modalShow: true })

    csvClose = () => this.setState({ csvModalShow: false })
    csvShow = () => this.setState({ csvModalShow: true })

    newRowClose = () => this.setState({ newRowShow: false })
    newRowShow = () => {
        this.setState({
            newRowShow: true
        })
    }
    handleChange(e) { this.setState({ value: e.target.value }) }
    handleRowChange(e) { this.newRowResolved[e.target.name] = e.target.value }
    handleFilterChange(e) { this.setState({ keyword: e.target.value }) }
    addNewColumn = () => {
        this.props.dispatch(resourceActions.addNewColumn(this.state.value))
        this.setState({ modalShow: false })
    }
    handleNewRow = () => {
        this.props.dispatch(resourceActions.addNewRow(JSON.stringify(this.newRowResolved)))
        this.setState({newRowShow: false})
    }
    importCsv = (data) => {
        this.setState({ csvModalShow: false })
        let newResourcesResolved = []
        const dataTitle = data[0] ? data[0] : null
        const dataBody = data.slice(1) ? data.slice(1) : null
        dataBody.map((param, index) => {
            let resourceBeforeAddedToState = {}
            dataTitle.map((title, i) => { return resourceBeforeAddedToState[title] = param[i] })
            return newResourcesResolved.push(JSON.stringify(resourceBeforeAddedToState))
        })
        this.setState({
            newAttributesResolved: dataTitle,
            newResourcesResolved: newResourcesResolved,
            submitButtonShow: true
        })
    }
    newRow = (attributes) => {
        return (
            <tr>
                {attributes.map((attribute, index) => {
                    return (
                        <td key={attribute.id}>
                            {index === attributes.length - 1 ?
                                <>
                                    <a onClick={this.handleNewRow}><IoIosCheckmarkCircle /></a>
                                    <a onClick={this.newRowClose}><IoIosCloseCircle /></a>
                                </> : null}
                            <input 
                                type="text" 
                                name={attribute.name} 
                                onChange={(e) => this.handleRowChange(e)} 
                                className="new-row inline"
                                />
                        </td>
                    )
                })}
            </tr>
        )
    }

    handleSubmit = () => {
        this.props.dispatch(resourceActions.addManyRow(this.state.newResourcesResolved))
        this.props.dispatch(resourceActions.addManyCol(this.state.newAttributesResolved))
    }
    handleFilterChange = e => this.setState({[e.target.name] : e.target.value})

    render() {
        let { resources, attributes } = this.props
        const resourceFiltered = resources.slice()
        let resourceRemake = []
        resourceFiltered.map(resource => {
            const values = Object.values(resource.resource)
            values.map(val=> val.includes(this.state.keyword.toLowerCase()) && resourceRemake.indexOf(resource) < 0 
                ? resourceRemake.push(resource) 
                : null)
            return resourceRemake
        })
        resources = resourceRemake;

        const firstNumber = (this.state.page - 1) * this.state.pageLength
        const lastNumber = this.state.page * this.state.pageLength
        const data = resources.slice(firstNumber, lastNumber)

        return (
            <div>
                <ButtonToolbar>
                    <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.csvModalShow}
                        onHide={this.csvClose}>
                        <Modal.Body>
                            <h4>New Column Name</h4>
                            <CSVReader onFileLoaded={(data) => this.importCsv(data)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.csvClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </ButtonToolbar>
                <ButtonToolbar>
                    <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.modalShow}
                        onHide={this.modalClose}>
                        <Modal.Body>
                            <h4>New Column Name</h4>
                            <input type="text" name="newColumn" value={this.state.value} onChange={(e) => this.handleChange(e)} /><br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.addNewColumn}>OK</Button>
                            <Button onClick={this.modalClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </ButtonToolbar>
                <div className="bigtable-bar">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Keyword"
                        value={this.state.keyword}
                        onChange={(e) => this.handleFilterChange(e)}
                        className="inline" 
                        id="filter-bar"/>
                    <button id="inline-filter-button"><FiSearch /></button>
                    <ButtonGroup className="inline float-right">
                        <DropdownButton as={ButtonGroup} title="" id="bg-nested-dropdown" size="sm" >
                            <Dropdown.Item onClick={this.modalShow}>add new column</Dropdown.Item>
                            <Dropdown.Item onClick={this.newRowShow}>add new row</Dropdown.Item>
                            <Dropdown.Item onClick={this.csvShow}>import csv</Dropdown.Item>
                        </DropdownButton>
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
                                    {attributes.map(attribute => {
                                        return <td key={attribute.id}>{row.resource[attribute.name]}</td>
                                    })}
                                </tr>
                            )
                        })}
                        {this.state.newRowShow ? this.newRow(attributes) : null}
                    </tbody>
                </Table>
                <div>
                    {this.state.submitButtonShow ?
                        <Button show={this.submitButtonShow} onClick={this.handleSubmit}>Submit</Button>
                        : null}
                </div>
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    if (state.gets.resources && state.gets.attributes) {
        const { resources, attributes } = state.gets
        return {
            resources: resources,
            attributes: attributes
        };
    }
    else {
        return {
            resources: [],
            attributes: []
        }
    }
}

export default connect(mapStateToProps)(BigTable);