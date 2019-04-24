import React from 'react';
import PropTypes from 'prop-types';

// styles
import style from './styles.scss';

class BreadCrumb extends React.Component {
  render() {
    const { categories } = this.props;
    console.log('bread', categories);
    return (
      <div className={style.breadcrumb}>
        <p>
          {categories.map((item, index) => (
            <span key={index}>
              {item}
              <span> > </span>
            </span>
          ))}
        </p>
      </div>
    );
  }
}

const { array } = PropTypes;
BreadCrumb.propTypes = {
  categories: PropTypes.array,
};

export default BreadCrumb;
