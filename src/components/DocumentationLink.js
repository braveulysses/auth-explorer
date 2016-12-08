import React, {Component} from 'react';
import { Label, Icon } from 'semantic-ui-react';

class DocumentationLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.open(this.props.url, 'brokerDocs');
  }

  render() {
    if (this.props.url) {
      return (
          <Label
              horizontal
              color="teal"
              size="tiny"
              as="a"
              onClick={this.handleClick}>
            <Icon name="info"/>
            docs
          </Label>
      );
    } else {
      return null;
    }
  }
}

DocumentationLink.propTypes = {
  url: React.PropTypes.string
};

export default DocumentationLink;