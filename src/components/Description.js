import React, {Component} from 'react';

class Description extends Component {
  render() {
    return (
        <div className="Description">
          <p>{this.props.children}</p>
        </div>
    );
  }
}

export default Description;