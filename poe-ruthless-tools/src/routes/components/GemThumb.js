import React from 'react';

class GemThumb extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  componentDidUpdate() {
  }

  render() {
    return (
      <div className='gemThumbContainer' onClick={() => this.props.selectGemFromList(this.props.gem)}>
        <div className='gemThumbPic'><img src='/media/Absolution_inventory_icon.png'></img></div>
        <div className='gemThumbOverlay'>{this.props.gem.name}</div>
      </div>
    );
  }
}

export default GemThumb;