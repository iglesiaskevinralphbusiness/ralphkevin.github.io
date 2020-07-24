import React, { Component } from "react";

import ProductItem from "./productItem";

class products extends Component {
  state = {
    select: []
  };

  render() {
    const { items } = this.props;

    return (
      <ul className="productList">
        {items.map(item => (
          <ProductItem
            key={item._id}
            item={item}
            onClick={this.handleClick}
            onChange={this.handleChange}
          />
        ))}
      </ul>
    );
  }

  handleChange = (id, size) => {
    const selected = {
      size: size
    };
    const select = { ...this.state.select };
    select[id] = selected;

    this.setState({ select });
  };

  handleClick = id => {
    const size = this.state.select[id];

    if (size) this.props.onClick(id, size.size);
  };
}

export default products;
