import React from 'react';
import Currency from 'react-currency-formatter';

// styles
import style from './styles.scss';

class ProductCard extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className={style.detailView}>
        <div className={style.detail}>
          <img className={style.image} src={item.picture} alt="imagen" />
          <div className={style.principalInfo}>
            {item.condition === 'new' ? (
              <p>Nuevo - {item.sold_quantity} vendidos</p>
            ) : (
              <p>Usado</p>
            )}
            <h4>{item.title}</h4>

            <h2>
              {item.price.currency === 'USD' ? <span>U</span> : ''}
              <Currency quantity={item.price.amount} currency="ARS" />
            </h2>
            <button>Comprar</button>
          </div>
        </div>
        <div className={style.productDetail}>
          <h5>Descripción del producto</h5>
          {item.description ? (
            <p>{item.description}</p>
          ) : (
            <p>El vendedor no incluyó una descripción del producto</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProductCard;
