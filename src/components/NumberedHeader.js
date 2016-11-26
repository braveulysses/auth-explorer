import React, {Component} from 'react';
import { Header, Label } from 'semantic-ui-react';

class NumberedHeader extends Component {
  render() {
    return(
        <Header size={this.props.size}>
          {this.props.number &&
            <span>
              <Label circular color="black" size="mini">
                {this.props.number}
              </Label>
              &nbsp;
            </span>
          }
          {this.props.children}
        </Header>
    );
  }
}

NumberedHeader.propTypes = {
  number: React.PropTypes.number,
  size: React.PropTypes.oneOf([
      'mini', 'tiny', 'small', 'medium', 'large', 'huge'
  ])
};

NumberedHeader.defaultProps = {
  size: 'tiny'
};

export default NumberedHeader