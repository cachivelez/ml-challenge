import React from 'react';
import Currency from 'react-currency-formatter';

// Router
import { Link } from 'react-router-dom';

// styles
import style from './styles.scss';

// assets
import ship from '../../assets/ic_shipping.png';

class ProductCard extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <Link to={'/items/' + item.id}>
        <div className={style.detail}>
          <img className={style.image} src={item.picture} alt="imagen" />
          <div className={style.value}>
            <h4>
              {item.price.currency === 'USD' ? <span>U</span> : ''}
              <Currency quantity={item.price.amount} currency="ARS" />
              {item.free_shipping ? <img src={ship} alt="" /> : ''}
            </h4>
            <p className={style.description}>{item.title}</p>
          </div>
          <p className={style.location}>{item.address}</p>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
