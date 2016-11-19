import React, {Component} from 'react';
// import URI from 'urijs';
import './AuthRequest.css';

class LoginRequester extends Component {
  constructor(props) {
    super(props);
    this.state = { flowUrl: this.props.flowUrl };
  }

  handleUpdate(event) {
    this.setState({ flowUrl: event.target.value });
  }

  requestLogin() {
    // window.location = this.state.flowUrl;
    // event.preventDefault();
  }

  doGet() {

  }

  doPut() {

  }

  render() {
    return (
      <div className="AuthRequest">
        <form>
          <textarea></textarea>
          <br/>
          <input
            type="text"
            className="FlowUrl"
            onChange={this.handleUpdate}
            value={this.state.flowUrl}
          />
          <button onClick={this.doGet}>GET</button>
        </form>
      </div>
    );
  }
}

export default LoginRequester;
