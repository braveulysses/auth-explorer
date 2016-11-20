import React, {Component} from 'react';
import { Card, Input, Button } from 'semantic-ui-react';
import './AuthUrl.css';

class AuthUrl extends Component {
  constructor(props) {
    super(props);
    this.setUrl = this.setUrl.bind(this);
  }

  setUrl(event) {
    this.props.setAuthUrl(this.props.url.url);
  }

  render() {
    return (
        <Card key={this.props.url} fluid className="AuthUrl">
          <Card.Content>
            <Card.Header>
              {this.props.url.name}
            </Card.Header>
            <Card.Meta>
              <Input
                  transparent
                  fluid
                  defaultValue={this.props.url.url}
              />
            </Card.Meta>
            <Card.Description>
              {this.props.url.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui buttons">
              <Button
                  primary
                  content="Set request URL"
                  size="small"
                  icon="compass"
                  labelPosition="left"
                  onClick={this.setUrl}
              />
            </div>
          </Card.Content>
        </Card>
    );
  }
}

export default AuthUrl;