import React, { Component } from "react";
import { stockArray } from "./stocks.js";
import "./styles.css";
const localStocks = stockArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { buying: [], selling: [], sArray: localStocks };

    this.sellStock = this.sellStock.bind(this);
    this.buyStock = this.buyStock.bind(this);
    this.empty = this.empty.bind(this);
    this.empty2 = this.empty2.bind(this);
  } // end constructor

  buyStock(symbol) {
    //console.log("STOCK: " + symbol);
    let foundItem = this.state.sArray.filter(this.findItemBySymbol(symbol));
    console.log(foundItem.Symbol);
    this.setState({ buying: this.state.buying.concat(foundItem) });
  }
  sellStock(symbol) {
    let foundItem = this.state.sArray.filter(this.findItemBySymbol(symbol));
    console.log(foundItem.Symbol);
    this.setState({ selling: this.state.selling.concat(foundItem) });
    console.log(this.state.selling);
  }

  findItemBySymbol(symbolToFind) {
    console.log("HERE");
    return function (sObject) {
      return sObject.Symbol === symbolToFind;
    };
  }

  empty() {
    this.setState({ buying: [] });
  }
  empty2() {
    this.setState({ selling: [] });
  }
  boxMouseOverHandler(e) {
    console.log(e.target);
  }

  render() {
    return (
      <div className="App">
        <h1>Stocks and Shares</h1>
        <hr />

        <div className="container">
          <div className="orders">
            <h2>BUYING:</h2>
            Total objects: {this.state.buying.length}
            <br />
            Total cost:{" "}
            {this.state.buying.reduce((total, item) => {
              return total + item.Price;
            }, 0)}
            <br />
            <button className="empbtn" onClick={this.empty}>
              EMPTY
            </button>
            <ol>
              {this.state.buying.map((s) => (
                <li key={s.Symbol}>
                  {s.Symbol}
                  {s.Company}
                  {s.Price}
                </li>
              ))}
            </ol>
          </div>
          <pre> </pre>
          <div className="orders">
            <h2>SELLING:</h2>
            Total objects: {this.state.selling.length}
            <br />
            Total cost:{" "}
            {this.state.selling.reduce((total, item) => {
              return total + item.Price;
            }, 0)}
            <br />
            <button className="empbtn" onClick={this.empty2}>
              EMPTY
            </button>
            <ol>
              {this.state.selling.map((s) => (
                <li key={s.Symbol}>
                  {s.Symbol}
                  {s.Company}
                  {s.Price}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <hr />
        <ul>
          {this.state.sArray.map((s) => (
            <li className="li" key={s.Symbol}>
              <div className="buttons" onMouseOver={this.boxMouseOverHandler}>
                <b style={{ width: "15%" }}>{s.Symbol}</b>
                <i style={{ flexGrow: 5 }}>{s.Company}</i> <p>${s.Price}</p>
                <button
                  className="buybtn"
                  onClick={() => this.buyStock(s.Symbol)}
                >
                  BUY
                </button>
                <button
                  style={{ background: "red", color: "white" }}
                  className="sellbtn"
                  onClick={() => this.sellStock(s.Symbol)}
                >
                  SELL
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default App;
