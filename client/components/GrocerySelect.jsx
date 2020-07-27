import React from 'react';

class GrocerySelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<>
      <div id="grocery-select">
        {this.props.products.map((product) => {
          return (<>
            <div class="grocery-select-item" onClick={() => this.props.addProduct(product)}>
              {product.description} at ${product.items[0].price.regular} for {product.items[0].size}
            </div>
          </>);
        })}
      </div>
    </>);
  }
}

export default GrocerySelect;