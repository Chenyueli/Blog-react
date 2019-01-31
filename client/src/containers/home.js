import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBookList } from '../redux/actions/list';
import '../assets/home.less';
import { fetch } from '../common/model'
import { DatePicker, message } from 'antd';


class Home extends Component {
  constructor(){
		super();
		this.state = {
			data: null,
      page: 1,// 当前加载页
      size: 20,//每次请求条数
		}
    this.loadMore = this.loadMore.bind(this);// 加载更多
	}
  static fetch(store){
      // return this.props.dispatch(fetchBookList({page:1,size:20}))
  }
  componentDidCatch(error, info) {
    // 在这里可以做异常的上报
    console.log('发送错误'+ error, info)
  }
  componentDidMount(){
    console.log(3333)

    console.log(this.state)
    console.log(this.props)
  }
  componentWillMount() {
      const { booklist } = this.props;
      let a = booklist;
      console.log(this.state)
      console.log(this.props)
      fetch('/users').then((res) => {
        console.log(111111)
        console.log(res)
       }).catch((err) => {
       console.log(22222)
       console.log(err)
     })
      if(booklist.length === 0){
        // this.props.fetchBookList({page:this.state.page,size:this.state.size});
      }
  }
  componentDidMount(){

  }
  handleChange(value) {
    message.info('您选择的日期是: ' + value.toString());
    this.setState({
      date: value
    });
  }

  loadMore(no){
    this.props.fetchBookList({ page:no ,size: this.state.size });
    this.setState({ page: no });
  }
  render() {
    let { booklist} = this.props;
    let { page } = this.state;
    return (
        <div className="home">
        <DatePicker onChange={this.handleChange} />
        <div className="title">古文目录</div>
        <button onClick=""></button>
        <BookList booklist={ booklist }></BookList>
         <div className="btn-container" >
         <a className="action" onClick={ this.loadMore.bind(this, page + 1)} > 加载更多... </a>
        </div>
      </div>
    );
  }
}
/**
 * 数据目录 组件
 * @param {*} param
 */
const BookList = ({booklist})=>{
  return (
    <div className="book-list">
    {
      booklist.map((item,index) =>(
        <div className="book-list-item" key= { 'bookindex' + index}>
          <div> 
            <Link  className="name" to={`/book/${item.dbName}`}> {item.bookName} </Link> 
          </div>
          <div className="detail" >{item.bookDetail}</div>
        </div>
      )
      )
    }
    </div>
  )
}
const mapStateToProps = (state) => ({
  booklist:state.booklist.list,
  pagination:state.booklist.pagination
});
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBookList1: (...args) => dispatch(fetchBookList(...args)),
    fetchBookList: fetchBookList
  }
}

Home.propTypes = {
  booklist:PropTypes.array.isRequired,
  pagination:PropTypes.object.isRequired,
}
BookList.propTypes= {
  booklist:PropTypes.array.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
