import React from 'react';

// rest
import Axios from 'axios';

// Components
import ProductDetail from '../components/ProductDetail';
import BreadCrumb from '../components/BreadCrumb';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: [],
    };
  }

  componentWillMount() {
    Axios.get(
      'http://localhost:3000/api/items/' + this.props.match.params.id,
    ).then(response => this.setState({ productDetail: response.data }));
  }

  render() {
    const productDetailData = this.state.productDetail;

    return (
      <React.Fragment>
        {/* Content */}
        <main>
          {productDetailData.item ? (
            <div>
              <BreadCrumb categories={productDetailData.categories} />
              <ProductDetail item={productDetailData.item} />
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

export default Details;
