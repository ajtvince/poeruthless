import React from 'react';

class GemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { styling: {} };
    console.log(this.state);
  }

  componentDidMount() {
    console.log('mounted');
    if (this.props.optimal === true) {
      this.setState({
        styling: {transform: 'scale(1.05)', boxShadow: '#e8ba7f 0px 0px 20px'}
      });
      setTimeout(() => {
        this.setState({
          styling: {},
        });
      }, 800);
    }
  }
  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div className='gemIconContainer' style={this.state.styling}>
        <div className='gemIconPic'>
          <img src='/media/Absolution_skill_icon.png' alt='-------'/>
        </div>
        <div className='gemIconName'>{this.props.gem.name}</div>
        <div className='gemIconContainerL'>
          <div className='gemIconClassLabel'>Class: </div>
          <div className='gemIconQuestLabel'>Quest: </div>
        </div>
        <div className='gemIconContainerR'>
          <div className='gemIconClass'>{this.props.gem.class}</div>
          <div className='gemIconQuest'>Act {this.props.gem.act}: {this.props.gem.quest}</div>
        </div>
        <div className='gemIconDelete' onClick={() => this.props.removeGemFromList(this.props.gem)}>X</div>
        <a href={'https://www.poewiki.net/wiki/' + this.props.gem.name} className='gemIconWiki'>wiki</a>
      </div>
    );
  }
}

export default GemCard;