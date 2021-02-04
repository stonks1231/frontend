import React, { Component, Fragment, PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tooltip from 'react-bootstrap/Tooltip';
import format from 'date-fns/format';

class ColumnItem extends PureComponent {
  
  componentDidMount() {
  }

  isMod(item) {
    if (item.author.is_mod) {
      return <span className="badge badge-primary">MOD</span>;
    } else {
      return "";
    }
  }

  isGold(item) {
    if (item.author.is_gold) {
      return <span className="badge badge-warning">GOLD</span>;
    } else {
      return "";
    }
  }

  getTickerElement(ticker) {
    return <span className="badge badge-pill badge-dark float-right" key={ticker}>{ticker.toUpperCase()}</span>
  }
  getTickers(item) {
    const tickers = [];
    for (const ticker of item.tickers) {
      tickers.push(this.getTickerElement(ticker));
    }
    return tickers;
  }

  render() {
    const item = this.props.item;
    
    
    const created_utc = format(new Date(item.created_utc * 1000), "HH:mm:ss");

    return (

        <Fragment>
          <Card className="mb-3 mx-3" style={this.props.style}>
            <Card.Header>
              <small>
                <Row>
                  <Col md="7">
                    <h6>
                      {item.author.name}
                      <br />
                      <span className="badge badge-success">{item.author.comment_karma}
                      </span>
  
                      {this.isMod(item)}
                      {this.isGold(item)}
                      <span className="badge badge-secondary">1 hr post count - {item.author.one_hour_post_count}</span>
                    </h6>
                  </Col>
                  <Col md="5">
                    Tickers:
                  {this.getTickers(item)}
                  </Col>
  
  
                </Row>
  
  
              </small>
  
  
            </Card.Header>
            <Card.Body>
              {item.body}
  
  
            </Card.Body>
            <Card.Footer>
              <small>
                <Row>
                  <Col>
                    {created_utc}
                  </Col>
  
                  <Col>
                    <a href={"https://www.reddit.com" + item.permalink} className="float-right" target="_blank" rel="noreferrer">link</a>
                  </Col>
                </Row>
              </small>
            </Card.Footer>
          </Card>
        </Fragment>
  
  
    );
  }

}

export default ColumnItem;