import React from 'react';
import BookImage from './BookImage';
import BookInfo from './BookInfo';

export default class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const book = this.props.book;
    return (
      <div className="row">
        <BookImage col="col-3" book={book} />
        <BookInfo col="col-9" book={book}>
          {this.props.children}
        </BookInfo>
      </div>
    );
  }
}
