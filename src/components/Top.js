import React, {Component} from 'react';
import { Header, Step } from 'semantic-ui-react';

class Top extends Component {
  constructor(props) {
    super(props);
    const steps = [
      {
        icon: 'key',
        title: 'OAuth',
        description: 'Make an OAuth 2 request'
      },
      {
        icon: 'user',
        title: 'Auth API',
        description: 'Authenticate a user'
      }
    ];
    this.state = { steps: steps };
    this.setActive = this.setActive.bind(this);
    this.setActive(this.props.step);
  }

  setActive(activeStep) {
    const steps = this.state.steps.map(step => {
      step.active = step.title === activeStep;
      return step;
    });
    this.setState({ steps: steps });
  }

  render() {
    const { Group } = Step;
    return (
      <div className="ui">
        <Header as='h1'>Broker Auth Explorer</Header>
        <Group items={this.state.steps}/>
      </div>
    );
  }
}

export default Top;
