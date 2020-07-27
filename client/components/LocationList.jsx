import React from 'react';

class LocationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<>
      <div id="location-list">
        {this.props.locations.map(({ locationId, name, address }) => {
          return (<>
            <div class="location-item" onClick={() => this.props.selectLocation(locationId)} >{name} at {address.addressLine1} {address.city}, {address.state}</div>
          </>);
        })}
      </div>
    </>);
  }
}

export default LocationList;