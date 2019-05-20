// import React, { Component } from 'react'
// import { Col, Row } from "react-bootstrap";
// import formulaActions from "../../actions/formulaActions";
// import { connect } from 'react-redux';

// class Formula extends Component {
//     state = {
//     }
//     handleChange = e => { 
//         this.setState({ [e.target.name]: e.target.value }) 
//         this.props.dispatch(formulaActions.sendFormula(this.state, this.props.id))
//     }
//     render() {
//         const id = this.props.id
//         const fieldName = `field${id}`
//         const typeName = `type${id}`
//         const formulaName = `formula${id}`
//         console.log(this.state);

//         return (
//             <form onSubmit={this.props.handleSubmit}>
//                 <Row>
//                     <Col sm={3}>
//                         <h4>Field: </h4>
//                         <input type="text" name={fieldName} value={this.state[fieldName] || ''} onChange={(e) => this.handleChange(e)} />
//                     </Col>
//                     <Col sm={3}>
//                         <h4>Type: </h4>
//                         <select
//                             name={typeName}
//                             value={this.state[typeName]}
//                             onChange={(e) => this.handleChange(e)}
//                         >
//                             <option>Choose...</option>
//                             <option value="number">Number</option>
//                             <option value="text">Text</option>
//                             <option value="formula">Formula</option>
//                         </select>
//                     </Col>
//                     <Col sm={6}>
//                         {this.state[typeName] === "formula" ?
//                             <div>
//                                 <h4>Formula</h4>
//                                 <input type="text" name={formulaName} value={this.state[formulaName] || ''} onChange={(e) => this.handleChange(e)} />
//                             </div>
//                             : null}
//                     </Col>
//                 </Row>
//             </form>
//         )
//     }
// }



// export default connect()(Formula)
