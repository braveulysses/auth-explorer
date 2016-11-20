import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import Top from './Top';
import AuthRequester from './AuthRequester';
import OAuthRequester from './OAuthRequester';
import Done from './Done';
import Helpers from '../Helpers';

class Dispatcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: '',
      url: window.location.href,
      flowUrl: ''
    };
    this.setActiveStep = this.setActiveStep.bind(this);
    this.setUrl = this.setUrl.bind(this);
  }

  componentWillMount() {
    // Set the 'step' based on the current URL. The consent step is
    // detected in AuthRequester, because that's not based on the
    // current URL.
    let params = Helpers.parseParamsFromUrl(this.state.url);
    if (params.flow) {
      this.setState({
        step: 'Log in',
        flowUrl: params.flow
      });
    } else if (params.code || params.error
        || params.access_token || params.id_token) {
      this.setState({ step: 'Done' });
    } else {
      this.setState({ step: 'OAuth' });
    }
  }

  setActiveStep(activeStep) {
    this.setState({ step: activeStep });
  }

  setUrl(url) {
    this.setState({ url: url });
  }

  render() {
    switch (this.state.step) {
      case 'Log in':
        return (
            <Container>
              <Top step={this.state.step}/>
              <AuthRequester
                  url={this.state.flowUrl}
                  setDispatcherUrl={this.setUrl}
                  setActiveStep={this.setActiveStep}
              />
            </Container>
        );
      case 'Consent':
        return (
            <Container>
              <Top step={this.state.step}/>
              <AuthRequester
                  url={this.state.flowUrl}
                  setDispatcherUrl={this.setUrl}
                  setActiveStep={this.setActiveStep}
              />
            </Container>
        );
      case 'Done':
        return (
            <Container>
              <Top step={this.state.step}/>
              <Done url={window.location.href}/>
            </Container>
        );
      default:
        return (
            <Container>
              <Top step={this.state.step}/>
              <OAuthRequester/>
            </Container>
        );
    }
  }
}

export default Dispatcher;
