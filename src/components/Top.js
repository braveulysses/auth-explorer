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
    this.state = {
      steps: this.activeSteps(steps, this.props.step)
    };
    this.setActiveStep = this.setActiveStep.bind(this);
  }

  activeSteps(steps, activeStep) {
    return steps.map(step => {
      step.active = step.title === activeStep;
      return step;
    });
  }

  setActiveStep(activeStep) {
    this.setState({ steps: this.activeSteps(this.state.steps, activeStep )});
  }

  render() {
    const steps = this.activeSteps(this.state.steps, this.props.step);
    const { Group } = Step;
    return (
      <div className="ui">
        <Header as='h1'>Broker Auth Explorer</Header>
        <Group items={steps} size="small"/>
      </div>
    );
  }
}

export default Top;
