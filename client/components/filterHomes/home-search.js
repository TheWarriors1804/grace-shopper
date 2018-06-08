import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeSearchCard} from '../index'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class HomeSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      type: 'all',
      maxPrice: 'all',
      bedrooms: 'all',
      bathrooms: 'all'
    }
  }

  onChange(event) {}

  render() {
    return (
      <div className="searchPageContainer row">
        <div className="homeFilter card col s12 m4 l3">
          <div className="card-content">
            <span className="card-title">Modify Results</span>
            <form onChange={event => this.onChange(event)}>
              <div>Type</div>
              <label>
                <input type="radio" name="type" value="all" />
                <span>All homes</span>
              </label>
              <label>
                <input type="radio" name="type" value="Single Wide" />
                <span>Single Wide</span>
              </label>
              <label>
                <input type="radio" name="type" value="Double Wide" />
                <span>Double Wide</span>
              </label>
              <label>
                <input type="radio" name="type" value="Tiny Home" />
                <span>Tiny Home</span>
              </label>
            </form>
            <form>
              <div>Maximum Price</div>
              <select name="maxPrice" onChange={event => this.onChange(event)}>
                <option defaultValue value="all">
                  View all
                </option>
                <option value="60000">$60,000</option>
                <option value="80000">$80,000</option>
                <option value="100000">$100,000</option>
              </select>
            </form>
            <form>
              <div>Bedrooms</div>
              <select name="bedrooms" onChange={event => this.onChange(event)}>
                <option defaultValue value="all">
                  View all
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </form>
            <form>
              <div>Bathrooms</div>
              <select name="bathrooms" onChange={event => this.onChange(event)}>
                <option defaultValue value="all">
                  View all
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </form>
          </div>
        </div>
        <div className="col s12 m10 l11 searchTileContainer">
          {this.props.products
            .filter(product => {
              console.log(product.price, this.state.maxPrice >= product.price)
              return (
                (this.state.type === product.type ||
                  this.state.type === 'all') &&
                (Number(this.state.maxPrice) >= product.price ||
                  this.state.maxPrice === 'all') &&
                (this.state.bedrooms === product.bedrooms ||
                  this.state.bedrooms === 'all') &&
                (this.state.bathrooms === product.bathrooms ||
                  this.state.bathrooms === 'all')
              )
            })
            .map(product => (
              <HomeSearchCard product={product} key={product.id} />
            ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.product
  }
}

export default connect(mapState)(HomeSearch)

/**
 * PROP TYPES
 */
// SingleHome.propTypes = {
//   email: PropTypes.string
// };
