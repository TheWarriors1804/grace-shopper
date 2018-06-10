import React from 'react'
import {connect} from 'react-redux'

const UserEdit = props => {
  const {
    firstName,
    lastName,
    email,
    address,
    address2,
    city,
    stateAdd,
    zip
  } = props

  const handleChange = event => {
    console.log(event.target.value)
  }

  const handleSubmit = event => {
    console.log(event.target.value)
  }

  const firstName1 = 'Robert'
  const lName1 = 'Nkemdiche'
  const email1 = 'Robert.N@gmail.com'
  const address1 = "123 Albertson's Dr."
  const address21 = ''
  const city1 = 'San Francisco'
  const stateAdd1 = 'California'
  const zip1 = '94102'

  return (
    <div className="row userInfo" onChange={handleChange}>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="firstName" className="active">
              First Name
            </label>
            <div className="infoTag">
              <p>{firstName1}</p>
            </div>
          </div>
          <div className="input-field col s6">
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
            <div className="infoTag">
              <p>{lName1}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="email" className="active">
              Email
            </label>
            <div className="infoTag">
              <p>{email1}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="address1" className="active">
              Address 1
            </label>
            <div className="infoTag">
              <p>{address1}</p>
            </div>
          </div>
          <div className="input-field col s6">
            <label htmlFor="address2" className="active">
              Address 2
            </label>
            <div className="infoTag">
              <p>{address21}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="city" className="active">
              Town / City
            </label>
            <div className="infoTag">
              <p>{city1}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="inputField col s6">
            <label htmlFor="stateAdd" className="active">
              State
            </label>
            <div className="infoTag">
              <p>{stateAdd1}</p>
            </div>
          </div>
          <div className="input-field col s6">
            <label htmlFor="zip" className="active">
              Zip Code
            </label>
            <div className="infoTag">
              <p>{zip1}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn waves-effect waves-light col offset-s6 s4"
          >
            Edit Information
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    address: state.user.address
  }
}

export default connect(mapStateToProps)(UserEdit)
