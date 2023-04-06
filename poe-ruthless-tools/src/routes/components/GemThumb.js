import React from 'react';

class GemThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = { styling: {}};
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.buildList !== prevProps.buildList) {
      let tempStatus = false;
      this.props.buildList.forEach( gem => {
        if (gem.name === this.props.gem.name) {
          console.log('same wow');
          tempStatus = true;
        }
      });
      if(tempStatus) {
        this.setState({
          styling: {border: '4px green solid', color: 'green'}
        });
      } else {
        this.setState({
          styling: {}
        });
      }
    }
  }

  render() {
    return (
      <div className='gemThumbContainer' onClick={() => this.props.selectGemFromList(this.props.gem)}>
        <div className='gemThumbPic'><img src='/media/Absolution_inventory_icon.png'></img></div>
        <div style={this.state.styling} className='gemThumbOverlay'>{this.props.gem.name}</div>
      </div>
    );
  }
}

export default GemThumb;