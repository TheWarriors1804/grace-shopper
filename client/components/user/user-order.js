import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserInfo} from '../index'

/**
 * COMPONENT
 */
export const UserOrder = props => {
  const {firstName, lastName, imageUrl} = props

  return (
    <div>
      <div className="row">
        <div className="card horizontal col s11 m11 l11">
          <div className="card-image">
            <img src={imageUrl} />
          </div>
          <div className="card-content">{/* <UserInfo /> */}</div>
        </div>
      </div>
      <div className="row">
        <div className="card horizontal col s10 m10 l10">
          <h2> Previous Orders </h2>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imageUrl: state.user.imageUrl
  }
}

export default connect(mapState)(UserOrder)

/**
 * PROP TYPES
 */
UserOrder.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string
}
