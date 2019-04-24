import React from 'react';
import PropTypes from 'prop-types';

// Router
import { Link } from 'react-router-dom';

// styles
import style from './styles.scss';

// assets
import logo from '../../assets/Logo_ML.png';
import search from '../../assets/ic_Search.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className={style.header}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <form>
          <label>
            <input
              placeholder="Nunca dejes de buscar"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <Link
            className={style.search}
            to={'/items?search=' + this.state.value}
          >
            <input type="image" alt="Search" src={search} />
          </Link>
        </form>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
