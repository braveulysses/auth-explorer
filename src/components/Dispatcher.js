import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import URI from 'urijs';
import Top from './Top';
import AuthRequester from './AuthRequester';
import OAuthRequester from './OAuthRequester';

class Dispatcher extends Component {
  render() {
    let url = new URI(window.location.href);
    if (url.query().startsWith('flow')) {
      return (
        <div className="ui">
          <Top step="Auth API"/>
          <AuthRequester flowUrl={url.search(true)['flow']}/>
        </div>
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
