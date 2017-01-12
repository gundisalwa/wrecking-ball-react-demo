import React,{Component} from 'react';
import Slider from 'rc-slider';
import './slider.css';
import addOscilator from './addOscilator';
import addMagic from './addMagic';

const getCircleStyle = r =>
  ({ 
    borderRadius: '50%', 
    height: 2*r, 
    width: 2*r, 
    background: 'darkgrey' 
  })
const Circle = ({
  r, 
  children
}) =>
  <div className="circle" style={getCircleStyle(r)}>{children}</div>


const getLinkStyle = (l, w, t) =>
  ({
    height: l, 
    width: w, 
    borderRadius: '50%', 
    background:'transparent', 
    border:'solid ' + t + 'px ' + 'black'
  })
const Link = ({
  length=60, 
  width=40, 
  thickness=10
}) =>
  <div style={getLinkStyle(length, width, thickness)}/>




const BallAndChain = ({
  nLinks=5, 
  r=150, 
  lLength=60, 
  lWidth=30, 
  lThickness=8, 
  children
}) =>
  <div>
    {[...Array(nLinks).keys()].map((idx) => 
      <div key={idx} style={{transform:"translateX(" + (Math.round(-lWidth/2)) + "px)", height:lLength-2*lThickness-1 }}>
        <Link length={lLength} width={lWidth} thickness={lThickness}/>
      </div>
    )}
    <div style={{transform:"translateX(" + (-r) + "px)"}}>
      <Circle r={r}>
        {children}
      </Circle>
    </div>
  </div>


class WreckingBall extends Component {
  constructor(){
    super();
    this.state = { nLinks: 10 };
    this.setNumberLinks = this.setNumberLinks.bind(this);
  }
  
  setNumberLinks(nLinks){
    this.setState({nLinks});
  }
    
  render(){
   return (
     <div>
       <div style={{height:50}}>
         <Slider min={0} max={20} defaultValue={10} onChange={this.setNumberLinks}/>
       </div>
       <div style={{marginLeft:'50%'}}>
         <OscillatedBallAndChain nLinks={this.state.nLinks} period={4000} tick={25} r={150}>
           {this.props.children}
         </OscillatedBallAndChain>
       </div>
      </div>
    );
  }
}

const OscillatedBallAndChain = addOscilator(BallAndChain);

const MagicBall = addMagic(WreckingBall);

function Demo () {  
  return (
    <MagicBall>
      <h3 style={{textAlign:'center', width:'100%', height:'0', position:'relative', top:'calc(50% - 10px)'}}>Don't Click Me!!!</h3>
    </MagicBall>
  );
}

export default Demo;