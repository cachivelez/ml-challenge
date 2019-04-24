import React from 'react';

// Components
import Hello from '../components/Hello';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {/* Content */}
        <main>
          <Hello />
        </main>
        {/* End content */}
      </React.Fragment>
    );
  }
}

export default Home;
