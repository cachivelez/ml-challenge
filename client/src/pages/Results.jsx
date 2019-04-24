import React from 'react';

// rest
import Axios from 'axios';

// Components
import ProductCard from '../components/ProductCard';
import BreadCrumb from '../components/BreadCrumb';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
    };
  }

  componentWillMount() {
    Axios.get(
      'http://localhost:3000/api/items?q=' +
        this.props.location.search.split('=')[1],
    ).then(response => this.setState({ resultList: response }));
  }

  render() {
    const list = this.state.resultList;
    let listItems;
    if (list.data) {
      listItems = list.data.items.map((item, index) => (
        <ProductCard key={index} item={item} />
      ));
    }

    return (
      <React.Fragment>
        {/* Content */}
        <main>
          {list.data ? (
            <div>
              <BreadCrumb categories={list.data.categories} />
              <div>{listItems}</div>
            </div>
          ) : (
            ''
          )}
        </main>
        {/* End content */}
      </React.Fragment>
    );
  }
}

Results.propTypes = {};

export default Results;
