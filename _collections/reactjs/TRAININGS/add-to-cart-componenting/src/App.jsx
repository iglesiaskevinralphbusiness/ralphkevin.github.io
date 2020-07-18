import React, { Component } from "react";
import "./App.css";

import items from "./data/items";
import Products from "./components/products";

class App extends Component {
  state = {
    items: items,
    carts: []
  };

  render() {
    console.log(this.state.carts);

    return (
      <div className="shop">
        <div className="productsBlock">
          <Products items={items} onClick={this.handleAddCart} />
        </div>
        <div className="cartBlock">
          <ul />
        </div>
      </div>
    );
  }

  handleAddCart = (id, size) => {
    const clone_carts = { ...this.state.carts };
    const product = [
      {
        id: id,
        size: size
      }
    ];
    const carts = [...clone_carts, ...product];

    this.setState({ carts });
  };
}

export default App;
