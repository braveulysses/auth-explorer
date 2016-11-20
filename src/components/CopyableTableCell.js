import React, {Component} from 'react';
import { Table, Input, Icon } from 'semantic-ui-react';
import ClipboardButton from 'react-clipboard.js';
import Helpers from '../Helpers';

class CopyableTableCell extends Component {
  render() {
    const id = 'ctc-' + Helpers.randomGUID();
    const selector = '#' + id;
    return (
        <Table.Cell className="CopyableTableCell">
          <Input
              id={id}
              transparent
              fluid
              defaultValue={this.props.value}
          />
          <br/>
          <ClipboardButton data-clipboard-target={selector}>
            <Icon name="copy" size="small"/>
          </ClipboardButton>
        </Table.Cell>
    );
  }
}

export default CopyableTableCell;
