import React from 'react';

// styles
import style from './styles.scss';

// assets
import welcome from '../../assets/welcome.png';

class Hello extends React.Component {
  render() {
    return (
      <div className={style.hello}>
        <img src={welcome} alt="welcome" />
      </div>
    );
  }
}

export default Hello;
