import * as React from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectReddit, invalidateReddit } from '../redux/actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
  }

  render() {
    const {  isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
          {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </span>}
          {!isFetching && (
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          )}
        </p>
        <Counter
         value={store.getState()}
         onIncrement={() => action('INCREMENT')}
         onDecrement={() => action('DECREMENT')}
         onIncrementAsync={() => action('INCREMENT_ASYNC')} />

      </div>
    )
  }
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const { isFetching, lastUpdated, items: posts } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: [],
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
    value
  }
}

export default connect(mapStateToProps)(App)
