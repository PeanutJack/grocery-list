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
              {product.description} at ${product.items[0].price ? product.items[0].price.regular : null} for {product.items[0].size}
              {product.images ? product.images.map(({ featured, sizes }) => {
                if (featured) {
                  return sizes.map(({ size, url }) => size === 'thumbnail' ? <img src={url} /> : null);
                } else {
                  return null;
                }
              }) : null}
            </div>
          </>);
        })}
      </div>
    </>);
  }
}

export default GrocerySelect;