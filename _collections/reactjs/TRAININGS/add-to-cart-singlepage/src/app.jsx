import React from "react";

class App extends React.Component {
  state = {
    products: [
      {
        id: 1,
        title: "product 1",
        sizes: ["S", "M", "L"]
      },
      {
        id: 2,
        title: "product 2",
        sizes: ["S", "M"]
      }
    ],
    select: [],
    carts: []
  };

  render() {
    console.log(this.state.carts);

    return (
      <div>
        <div>
          <h2>Product</h2>
          {this.state.products.map(product => (
            <div key={product.id}>
              {product.title}
              <div>
                {product.sizes.map(size => (
                  <div key={size}>
                    <input
                      name={product.id}
                      type="radio"
                      onClick={() => this.handleClick(product.id, size)}
                    />
                    {size}
                  </div>
                ))}
                <button onClick={() => this.handleAdd(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>Cart</h2>
          <ul>
            {this.state.carts.map(cart => (
              <li>
                <p>1</p>
                <p>2</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  handleClick = (id, size) => {
    const selected = {
      size: size
    };
    const select = { ...this.state.select };
    select[id] = selected;

    this.setState({ select });
  };

  handleAdd = id => {
    const size = this.state.select[id];
    if (size) {
      const add = {
        id: id,
        size: size,
        total: 1
      };
      const carts = [...this.state.carts, add];

      this.setState({ carts });
    }
  };
}

export default App;
