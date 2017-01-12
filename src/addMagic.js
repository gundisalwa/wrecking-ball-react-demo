import React,{Component} from 'react';
import YouTube from 'react-youtube';

const faces = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/10868067_965781633450862_935804423505857625_n.jpg?oh=0417dcb1efd0f20899c340f0516c3af1&oe=590E8D2E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/14632989_10210917960846169_3491408242994866402_n.jpg?oh=0bd9c4917ff0d72097a06b291181f712&oe=58DDE812",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/18448_100870483280637_1699717_n.jpg?oh=a216365394ace951f8abefa0e806bbfb&oe=59202D42"
];

const miley = "http://i.imgur.com/td0ItNg.png";

export default BoringComponent => 
class extends Component {
  constructor(){
    super();
    this.state = { playing: false, currentFaceIdx: 0 };
    this.onClick = this.onClick.bind(this);
  }
  
  onReady(event){
    this.player = event.target; 
  }
  
  onClick(event){
    const isPlaying = !this.state.playing;
    this.setState({playing: isPlaying});
    this.player[isPlaying?'playVideo':'pauseVideo']();
       
    if(isPlaying){
      setTimeout(()=>
        (this.facesIntervalHandler = setInterval( () => 
          this.setState({currentFaceIdx: this.state.currentFaceIdx+1}), 
          2000 )
        ), 3500)
    } else {
      clearInterval( this.facesIntervalHandler );
    }
  }
  
  getFace(){
     const currentTime = this.player? this.player.getCurrentTime() : 0;
     return currentTime > 41 ? faces[this.state.currentFaceIdx%faces.length] : "";
  }
  
  render(){
    return (
      <div>
        <BoringComponent {...this.props}>
          <div onClick={this.onClick} 
             style={{height:'100%',width:'100%'}}>
            <div style={{opacity:this.state.playing?1:0, transform:'translate(-15%,-57%)', height:400, position:'absolute'}}>
              <img src={miley} height={400}/>
              <img src={this.getFace()}
                   style={{top:0, left:10, position:'absolute'}}
                   height={100}
                />
            </div>  
            {this.props.children}
          </div>
        </BoringComponent>
        <div style={{ opacity: this.state.playing?0.4:0, position:'fixed', zIndex:-1, height:'100%', width:'100%', top:0, left:0}}>
          <div style={{ height:'100%', width:'100%', position:'absolute', top:0, left:0, zIndex:1}}/>
          <YouTube videoId={"My2FRPA3Gf8"} opts={{width:'100%', height:'100%', playerVars:{ start:39 } }} onReady={this.onReady.bind(this)}/>
        </div>
        <div style={{opacity:0, position:"fixed", zIndex:-100}}>
          {faces.map( f => <img src={f}/>)}
        </div>
      </div>
    );
  }
  
}