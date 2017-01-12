import React,{Component} from 'react';

export default StaticComponent => {
   class OscillatedComponent extends Component {
    constructor(){
      super();
      this.state = { angle: 0, time: 0 };
    }
     
     componentDidMount(){
       this.oscilate();
     }
     
    getAngle(time){
      const {period, amplitude} = this.props;
      return amplitude * Math.cos( 2*Math.PI / period * time );
    }
     
    oscilate(){
      const {tick} = this.props;
      setInterval( () => this.tick(), tick );
    }
     
    tick(){
      const {tick} = this.props;
      this.setState({
        time: this.state.time + tick,
        angle: this.getAngle(this.state.time)
      });
    }
      
      
    render(){
      const {period, amplitude, tick, ...remainingProps} = this.props;
      return <div style={{transform: 'rotate(' + this.state.angle + 'deg)', height:'0', width:'0'}}>
        <StaticComponent {...remainingProps}>{this.props.children}</StaticComponent>
      </div>
    }
  }
  
  OscillatedComponent.defaultProps = {
    amplitude:30,
    period:2000,
    tick:50
  }
  
  return OscillatedComponent;
}