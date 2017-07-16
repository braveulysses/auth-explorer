import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Label } from 'semantic-ui-react';
import DocumentationLink from './DocumentationLink';

class FlowHeader extends Component {
  renderSuccessLabel(success) {
    if (success) {
      return (
          <Label color="green" horizontal size="tiny">success</Label>
      );
    } else {
      return (
          <span/>
      );
    }
  }

  render() {
    if (this.props.flowName) {
      return (
          <Container className="FlowHeader">
            <Header as="h2">
              {this.props.flowName}
              <DocumentationLink url={this.props.docUrl}/>
              {this.renderSuccessLabel(this.props.success)}
            </Header>
          </Container>
      );
    } else {
      return null;
    }
  }
}

FlowHeader.propTypes = {
  flowName: PropTypes.string.isRequired,
  docUrl: PropTypes.string,
  success: PropTypes.bool
};

FlowHeader.defaultProps = {
  success: false
};

export default FlowHeader;