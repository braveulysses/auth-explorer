import React, {Component} from 'react';
import 'whatwg-fetch';
// import brace from 'brace';
import AceEditor from 'react-ace';
import { Dimmer, Loader, Button, Input, Form } from 'semantic-ui-react';
import './AuthRequest.css';

import 'brace/mode/json';
import 'brace/theme/github';

class AuthRequester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowUrl: this.props.flowUrl,
      body: '',
      headers: [],
      loading: false
    };
    this.doGet = this.doGet.bind(this);
    this.doPut = this.doPut.bind(this);
    this.setBodyFromJson = this.setBodyFromJson.bind(this);
    this.updateFlowUrl = this.updateFlowUrl.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  updateFlowUrl(event) {
    console.log("new flow URL: " + event.target.value);
    this.setState({ flowUrl: event.target.value });
  }

  setBodyFromJson(body) {
    this.setState({ body: JSON.stringify(body, null, 2) });
  }

  updateBody(body) {
    this.setState({ body: body });
  }

  doSubmit(event) {
    console.log("submitted");
    event.preventDefault();
  }

  doGet() {
    console.log("GET");
    this.setState({ loading: true });
    fetch(this.state.flowUrl, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        this.setState({ loading: false });
        return response.json();
      }).then(json => {
        this.setBodyFromJson(json);
      }).catch(ex => {
        this.setState({ loading: false });
        console.warn('parsing failed', ex)
      });
  }

  doPut() {
    console.log("PUT");
    this.setState({ loading: true });
    fetch(this.state.flowUrl, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: this.state.body
      }).then(response => {
        this.setState({ loading: false });
        return response.json();
      }).then(json => {
        this.setBodyFromJson(json);
      }).catch(ex => {
        this.setState({ loading: false });
        console.warn('parsing failed', ex)
      });
  }

  render() {
    const { active } = this.state.loading;
    return (
      <div className="AuthRequest">
        <Dimmer.Dimmable dimmed={active}>
          <Dimmer active={active}/>
            <Loader active={active}/>
            <Form onSubmit={this.doSubmit}>
              <Form.Group inline>
                <Form.Field width="sixteen">
                  <label>URL</label>
                  <Input
                    type="text"
                    name="FlowUrl"
                    className="FlowUrl"
                    onChange={this.updateFlowUrl}
                    value={this.state.flowUrl}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Form.Field width="sixteen">
                  <AceEditor
                    mode="json"
                    theme="github"
                    showPrintMargin={false}
                    onChange={this.updateBody}
                    value={this.state.body}
                    name="AuthExplorerEditor"
                    width="100%"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <Button primary onClick={this.doGet}>GET</Button>
                </Form.Field>
                <Form.Field>
                  <Button secondary onClick={this.doPUT}>PUT</Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </Dimmer.Dimmable>
      </div>
    );
  }
}

export default AuthRequester;
