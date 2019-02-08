import React, { Component } from "react";

class productItem extends Component {
  render() {
    const { item, onClick, onChange } = this.props;

    return (
      <li key={item.key}>
        <p className="imgBlock">
          <img src={item.photo} />
        </p>
        <p className="ttlBlock">
          {item.title} <span>{item.price}</span>
        </p>
        <ul>
          {item.sizes.map(size => (
            <li key={size}>
              <input
                type="radio"
                name={item._id}
                onChange={() => onChange(item._id, size)}
              />
              {size}
            </li>
          ))}
        </ul>
        <button onClick={() => onClick(item._id)}>Add to Cart</button>
      </li>
    );
  }
}

export default productItem;
