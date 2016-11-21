import React, {Component} from 'react';
import { Label } from 'semantic-ui-react';

class ScopeStatus extends Component {
  render() {
    switch(this.props.granted) {
      case true:
        return (
            <Label color="green" horizontal size="tiny">granted</Label>
        );
      default:
        return (
            <Label color="red" horizontal size="tiny">not granted</Label>
        );
    }
  }
}

export default ScopeStatus;