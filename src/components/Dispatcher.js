import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import Top from './Top';
import AuthRequester from './AuthRequester';
import OAuthRequester from './OAuthRequester';
import Done from './Done';
import Helpers from '../Helpers';

class Dispatcher extends Component {
  render() {
    const url = window.location.href;
    let params = Helpers.parseParamsFromUrl(url);
    if (params.flow) {
      return (
          <Container>
            <Top step="Log in"/>
            <AuthRequester url={params.flow}/>
          </Container>
      );
    } else if (params.code || params.error || params.access_token || params.id_token) {
      return (
          <Container>
            <Top step="Done"/>
            <Done url={url}/>
          </Container>
      );
    } else {
      return (
          <Container>
            <Top step="OAuth"/>
            <OAuthRequester/>
          </Container>
      );
    }
  }
}

export default Dispatcher;
