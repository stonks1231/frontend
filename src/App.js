import React, { Fragment } from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/Header';
import ColumnItems from './components/ColumnItems';


import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import fromUnixTime from 'date-fns/fromUnixTime';

const { DeepstreamClient } = window.DeepstreamClient

const MAX_ITEMS_IN_ARRAY = 300;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstColItems: [],
      secondColItems: [],
      thirdColItems: []
    }
    this.today = new Date();
    this.displayedComments = {};
    
  }
  componentDidMount() {
    this.client = new DeepstreamClient('wss://www.stonksread.com/deepstream');
    this.client.login();

    this.client.event.subscribe('comments', (eventData) => {
      this.handleEvent(eventData);
    });
  }
  handleEvent(data) {
    const {id, author} = data;


    if (!this.displayedComments[id]) {
      const authorCreatedDate = fromUnixTime(author.created_utc);
      const authorCreatedAge = differenceInDays(this.today, authorCreatedDate);
      data.authorCreatedAge = authorCreatedAge;
      data.authorCreatedDate = format(authorCreatedDate, 'yyyy-MM-dd');
  
      if(authorCreatedAge < 360) {
        this.setState(state => {
          let thirdColItems = state.thirdColItems.concat(data);
          if (thirdColItems.length > MAX_ITEMS_IN_ARRAY) {
            const toPop = thirdColItems[0];
            thirdColItems = thirdColItems.filter(obj => obj.id !== toPop.id);
            delete this.displayedComments[toPop.id];
          }
          return {
            thirdColItems
          };
        });
      } else if(authorCreatedAge < 720) {
        this.setState(state => {
          let secondColItems = state.secondColItems.concat(data);
          if (secondColItems.length > MAX_ITEMS_IN_ARRAY) {
            const toPop = secondColItems[0];
            secondColItems = secondColItems.filter(obj => obj.id !== toPop.id);
            delete this.displayedComments[toPop.id];
          }
          return {
            secondColItems
          };
        });
      } else {
        this.setState(state => {
          let firstColItems = state.firstColItems.concat(data);
          if (firstColItems.length > MAX_ITEMS_IN_ARRAY) {
            const toPop = firstColItems[0];
            firstColItems = firstColItems.filter(obj => obj.id !== toPop.id);
            delete this.displayedComments[toPop.id];
          }
          return {
            firstColItems
          };
        });
      }
      
      this.displayedComments[id] = true;
    }
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <Fragment>
        <Header/>
      <Container fluid="fluid">
        <Row>
          <Col className="col-md-4 border-right" id="left">
            <ColumnItems  items={this.state.firstColItems} title="2 and up"/>
          </Col>

          <Col className="col-md-4 border-right" id="middle">
            <ColumnItems items={this.state.secondColItems} title="2 years old users"/>
          </Col>
          <Col className="col-md-4" id="right">
            <ColumnItems items={this.state.thirdColItems} title="1 year old users"/>
          
          </Col>

        </Row>
        
      </Container>
      <footer className="footer">
        <Container fluid="fluid">
        <small>
        <span className="text-center">Disclaimer: The information presented here is a "real-time" feed from <a href="https://www.reddit.com/r/wallstreetbets">/r/wallstreetbets</a> and is for informational purposes only and in no way should be construed as financial advice or recommendation to buy or sell any stock.</span></small>
      </Container>
    </footer>
      </Fragment>

    )
  }
}

export default App;
