import React, {Component} from 'react';
import { Header, Grid, Message } from 'semantic-ui-react';
import Top from './Top';
import AuthRequester from './AuthRequester';
import OAuthRequester from './OAuthRequester';
import Done from './Done';
import {parseParamsFromUrl} from '../Helpers';

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
    // Set the 'step' based on the current URL.
    // Note that some steps are set in AuthRequester based on the
    // content of the response body.
    let params = parseParamsFromUrl(this.state.url);
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
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step={this.state.step}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <AuthRequester
                      url={this.state.flowUrl}
                      setDispatcherUrl={this.setUrl}
                      setActiveStep={this.setActiveStep}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
      case 'Second factor':
        return (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step={this.state.step}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <AuthRequester
                      url={this.state.flowUrl}
                      setDispatcherUrl={this.setUrl}
                      setActiveStep={this.setActiveStep}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
      case 'Account flow':
        return (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step={this.state.step}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <AuthRequester
                      url={this.state.flowUrl}
                      setDispatcherUrl={this.setUrl}
                      setActiveStep={this.setActiveStep}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
      case 'Consent':
        return (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step={this.state.step}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <AuthRequester
                      url={this.state.flowUrl}
                      setDispatcherUrl={this.setUrl}
                      setActiveStep={this.setActiveStep}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
      case 'Done':
        return (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step={this.state.step}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <Done url={window.location.href}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
      case 'OAuth':
        return (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step={this.state.step}/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <OAuthRequester/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
      default:
        return (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={5}>
                  <Header as='h1'>Broker Auth Explorer</Header>
                  <Top step='Done'/>
                </Grid.Column>
                <Grid.Column width={11}>
                  <Message negative>
                    <Message.Header>Oops</Message.Header>
                    <p>Something's broken.</p>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        );
    }
  }
}

export default Dispatcher;
