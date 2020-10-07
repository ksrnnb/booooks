import Header from './Header';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './Pages';
import SubColumn from './SubColumn';
import Functions from './Functions';

import { BrowserRouter as Router } from 'react-router-dom';

const axios = window.axios;

class App extends React.Component {
  constructor() {
    super();

    // windowサイズが800px以上であればカラムを表示
    this.maxWidth = 800;
    const isVisible = window.innerWidth > this.maxWidth ? true : false;

    // const params = this.getParamsOfAuthenticatedUser();
    // const isLogin = params !== null;

    this.state = {
      isVisible: isVisible,
      isLogin: false,
      params: null,
      hasLoaded: false,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.deleteStateBook = this.deleteStateBook.bind(this);
    this.deleteStateGenresBooks = this.deleteStateGenresBooks.bind(this);
    this.redirectUserProfileAfterDeleteBooks = this.redirectUserProfileAfterDeleteBooks.bind(
      this
    );
  }

  componentDidMount() {
    this.windowSizeChange.call(this);
    this.getParamsOfAuthenticatedUser();
  }

  deleteStateBook(ids) {
    const params = this.state.params;
    const books = params.books;

    params.books = Functions.unsetBooks(ids, books);

    this.setState({
      params: params,
    });
  }

  deleteStateGenresBooks(ids) {
    const params = this.state.params;
    const genresBooks = params.genres_books;

    params.genres_books = Functions.unsetGenresBooks(ids, genresBooks);

    this.setState({
      params: params,
    });
  }

  redirectUserProfileAfterDeleteBooks(props, ids) {
    this.deleteStateBook(ids);
    this.deleteStateGenresBooks(ids);

    const strId = this.state.params.user.str_id;
    const path = '/user/profile/' + strId;

    props.history.push(path);
  }

  login(props) {
    // TODO: 前にログインしていた場合、反映に少し時間がかかる。
    this.getParamsOfAuthenticatedUser();
    props.history.push('/home');
  }

  logout(props) {
    axios
      .post('/api/logout')
      .then((response) => {
        this.setState({
          isLogin: false,
        });
        props.history.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getParamsOfAuthenticatedUser() {
    axios
      .get('/api/user/auth')
      .then((response) => {
        // TODO: Loginしていないときは？
        // response.data
        // {books, example_users, followers, follows, genres, genres_books,  posts, user}
        if (typeof response.data == 'object') {
          this.setState({
            isLogin: true,
            params: response.data,
            hasLoaded: true,
          });
        } else {
          this.setState({
            hasLoaded: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert('error happened getting auth user');
      });
  }

  windowSizeChange() {
    window.addEventListener('resize', () => {
      let isVisible = this.state.isVisible;
      const changedLargeToSmall =
        isVisible && window.innerWidth < this.maxWidth;
      const changedSmallToLarge =
        !isVisible && window.innerWidth > this.maxWidth;

      if (changedLargeToSmall || changedSmallToLarge) {
        this.setState({
          isVisible: !isVisible,
        });
      }
    });
  }

  onClickDelete(e) {
    const uuid = e.target.dataset.uuid;
    // 文字列の'false'はtrueになってしまうので以下のように判定
    const isPost = e.target.dataset.ispost === 'true' ? true : false;

    const path = isPost ? '/api/post' : '/api/comment';

    // TODO: 本当に消しますか？って出したい
    axios
      .delete(path, {
        data: { uuid: uuid },
      })
      .then((response) => {
        const posts = response.data;
        const params = this.state.params;
        params.posts = posts;

        this.setState({
          params: params,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const appName = document.title;
    const params = this.state.params;
    const isVisible = this.state.isVisible;
    const hasLoaded = this.state.hasLoaded;

    // TODO: まとめられない？
    let user = null;
    if (params) {
      user = this.state.params.user;
    }

    let url;
    if (this.state.isLogin) {
      url = '/user/profile/' + user.str_id;
    } else {
      url = null;
    }
    if (hasLoaded) {
      console.log('rendering!');
      if (isVisible) {
        return (
          <Router>
            <div className="container">
              <Header userUrl={url} app={appName} hasHamburger={false} />
              <SubColumn userUrl={url} params={params} logout={this.logout} />
              {/* {this.pages(params, isVisible)} */}
              <Pages
                params={params}
                isVisible={isVisible}
                login={this.login}
                logout={this.logout}
                onClickDelete={this.onClickDelete}
                deleteBooks={this.deleteBooks}
                redirectUserProfileAfterDeleteBooks={
                  this.redirectUserProfileAfterDeleteBooks
                }
              />
            </div>
          </Router>
        );
      } else {
        return (
          <Router>
            <div className="container">
              <Header userUrl={url} app={appName} hasHamburger={true} />
              <Pages
                params={params}
                isVisible={isVisible}
                login={this.login}
                logout={this.logout}
                onClickDelete={this.onClickDelete}
                redirectUserProfileAfterDeleteBooks={
                  this.redirectUserProfileAfterDeleteBooks
                }
              />
            </div>
          </Router>
        );
      }
    } else {
      // TODO: 読み込み中の間に表示するコンポーネント！
      return <></>;
    }
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
