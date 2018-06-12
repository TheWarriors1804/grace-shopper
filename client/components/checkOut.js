import React from 'react'
import {HomeSearchCard} from './index'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/user'

class CheckOut extends React.Component {

  componentDidMount() {
    // this.props.fetchOrderHistory(3)
    console.log('in component did mount')
  }

  render() {
    // this.props.fetchOrderHistory(3)
    console.log('the user is: ', this.props.user, this.props.orderHistory)
    const orderNum = Object.keys(this.props.order).reduce(
      (acc, curr) => acc + Number(this.props.order[curr]),
      0
    )
    console.log('this.props.order is: ', this.props.order)
    const orderTotal =
      Object.keys(this.props.order).length && this.props.products.length
        ? Object.keys(this.props.order).reduce((acc, productId) => {
            const product = this.props.products.find(
              currProd => Number(productId) === currProd.id
            )
            return acc + product.price * this.props.order[productId]
          }, 0)
        : 0

    const formatPrice = price =>
      Number(price).toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
      })

    const tax = 0.08875

    return (
      <div>
        <div className="checkout-container row valign-wrapper">
          <div className="checkout-text col s12 m6 offset-m1">
            <h1>SHOPPING CART</h1>
            <h2>
              {`You have `}
              {orderNum}
              {` ${orderNum === 1 ? `item` : `items`} in your shopping cart.`}
            </h2>
          </div>
          {
            Object.keys(this.props.order)[0] ? <button
            type="submit"
            className="btn waves-effect waves-light green"
            onClick={event => console.log(event)}
          >
            Proceed with your order
          </button> : <div></div>
          }
        </div>

          {
            Object.keys(this.props.order)[0] ?
        <div><div className="checkout-summary row">
          <div className="col s12 m10 offset-m1">
            <div className="card blue-grey lighten-4">
              <div className="card-content checkout-text">
                <span className="card-title">ORDER SUMMARY</span>
                <div>
                  <div>Subtotal: {formatPrice(orderTotal)}</div>
                  <div>Tax: {tax * 100}%</div>
                  <div>Shipping: FREE</div>
                  <div>Total: {formatPrice(orderTotal * (1 + tax))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
            <div className="checkout-text checkout-orders-container row">
          <div className="col s12 m10 offset-m1">
            <h2>View or modify order</h2>
            <div className="checkout-orders">
              {Object.keys(this.props.order).length &&
              this.props.products.length ? (
                Object.keys(this.props.order).map(productId => (
                  <HomeSearchCard
                    product={this.props.products.find(
                      product => product.id === Number(productId)
                    )}
                    key={productId}
                    quantity={this.props.order[productId]}
                  />
                ))
              ) : (
                <div />
              )}
            </div>
          </div>
        </div></div> :
        <div></div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  order: state.order,
  products: state.product,
  orderHistory: state.user.orderHistory
})

const mapDispatchToProps = dispatch => ({
  fetchOrderHistory: (userId) => dispatch(fetchOrderHistory(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
