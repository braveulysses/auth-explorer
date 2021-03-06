import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Header, Card } from 'semantic-ui-react';
import AuthUrl from './AuthUrl';
import './AuthUrlList.css';
import { URLS_UI_DESCRIPTION } from '../Constants';

class AuthUrlList extends Component {
  render() {
    if (this.props.authUrls.length > 0) {
      return (
          <Container className="AuthUrlList">
            <Header as="h2">
              URLs
            </Header>
            <Container>
              { URLS_UI_DESCRIPTION }
            </Container>
            <Divider hidden/>
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
    } else {
      return null;
    }
  }
}

AuthUrlList.propTypes = {
  authUrls: PropTypes.array.isRequired,
  setAuthUrl: PropTypes.func.isRequired
};

export default AuthUrlList;