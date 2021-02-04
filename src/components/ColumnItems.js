import React, { Component, Fragment } from 'react';
import ColumnItem from './ColumnItem';

import './ColumnItems.css'
import ReactScrollToBottom from 'react-scroll-to-bottom';
import { FixedSizeList as List } from 'react-window';

class ColumnItems extends Component {

    render() {
        return (
            <Fragment>
                <h4>{this.props.title}</h4>
                <ReactScrollToBottom className="column-items">

                    {this.props.items.map(item => { return <ColumnItem className="pb-2" item={item} key={item.id} /> })}
                </ReactScrollToBottom>
            </Fragment>



        );
    }
}

export default ColumnItems;
