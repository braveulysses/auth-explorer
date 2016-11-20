import React, {Component} from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import AuthUrl from './AuthUrl';
import './AuthUrlList.css';

class AuthUrlList extends Component {
  render() {
    return (
        <Container className="AuthUrlList">
          <Header as="h2">
            { this.props.authUrls.length > 0 ? 'URLs' : '' }
          </Header>
          <Card.Group>
            {this.props.authUrls.map(url => {
              return (
                  <AuthUrl
                      key={url.url}
                      url={url}
                      setAuthUrl={this.props.setAuthUrl}
                  />
              );
            })}
          </Card.Group>
        </Container>
    );
  }
}

export default AuthUrlList;