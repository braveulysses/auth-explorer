import React, {Component} from 'react';
import { Header, Step } from 'semantic-ui-react';

class Top extends Component {
  constructor(props) {
    super(props);
    const steps = [
      {
        icon: 'openid',
        title: 'OAuth',
        description: 'Make an OAuth 2 request',
        href: '/'
      },
      {
        icon: 'sign in',
        title: 'Log in',
        description: 'Authenticate a user'
      },
      {
        icon: 'thumbs outline up',
        title: 'Consent',
        description: 'Authorize an access request'
      },
      {
        icon: 'protect',
        title: 'Done',
        description: 'Authentication complete'
      }
    ];
    this.state = { steps: this.activeSteps(steps, this.props.step) };
  }

  activeSteps(steps, activeStep) {
    return steps.map(step => {
      step.active = step.title === activeStep;
      return step;
    });
  }

  render() {
    const { Group } = Step;
    return (
      <div className="ui">
        <Header as='h1'>Broker Auth Explorer</Header>
        <Group items={this.state.steps} size="small"/>
      </div>
    );
  }
}

export default Top;
