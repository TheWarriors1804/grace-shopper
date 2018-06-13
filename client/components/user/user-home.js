import React, {Component} from 'react'
import {connect} from 'react-redux'
import {UserInfo, UserOrder, UserEdit} from '../index'
import {updateUser, deleteUser} from '../../store/user'
import {fetchOrderHistory} from '../../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  state = {
    editing: false,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      user: this.props.user
    })
    if (this.props.fetchOrderHistory) {
      this.props.fetchOrderHistory(this.props.user.id)
    }
  }

  handleClick = async () => {
    await this.props.deleteUser(this.props.user)
  }

  handleChange = event => {
    const id = event.target.id
    const value = event.target.value
    const oldState = this.state.user

    this.setState({
      user: {
        ...oldState,
        [id]: value
      }
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.handleEdit()

    await this.props.updateUser(this.state.user)
  }

  handleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render() {
    const {editing, user} = this.state
    const {firstName, lastName, imageUrl} = user
    const {orderHistory} = this.props.user

    const orderHistoryExists = orderHistory
      ? !!Object.keys(orderHistory).length
      : false

    const sortedOrders = orderHistoryExists
      ? Object.keys(orderHistory).sort((first, next) => next - first)
      : null

    if (!this.props.user) {
      return <h3>Loading User Info...</h3>
    }

    const userInfo = editing ? (
      <UserEdit
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleClick={this.handleClick}
        user={user}
      />
    ) : (
      <UserInfo handleEdit={this.handleEdit} user={user} />
    )
    return (
      <div>
        <h3 className="montserrat-text greeting">
          Welcome{`, ${firstName}`} {lastName}!
        </h3>
        <div className="row">
          <div className="card horizontal col s12 m10 l10 offset-m1 offset-l1">
            <div className="card-image">
              <img src={imageUrl} />
            </div>
            <div className="card-content">{userInfo}</div>
          </div>
        </div>

        {orderHistoryExists ? (
          sortedOrders.map(orderId => (
            <div className="row" key={orderId}>
              <div className="card horizontal col s12 m10 l10 offset-m1 offset-l1">
                <UserOrder
                  orderId={orderId}
                  orderDate={this.props.user.orderHistory[orderId].orderDate}
                  orderItems={this.props.user.orderHistory[orderId].orderItems}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="row">
            <div className="col s12 m10 l10 offset-m1 offset-l1 montserrat-text no-orders-text">
              No Previous Orders
            </div>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  deleteUser: user => dispatch(deleteUser(user.id)),
  fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
})

export default connect(mapState, mapDispatchToProps)(UserHome)
