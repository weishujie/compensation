import React, { Component } from 'react';
import './App.css';



class Page extends Component{
  render(){
    return(
        <div className="inner" style={{backgroundColor:this.props.bgcolor, opacity:this.props.number===this.props.index?1:0}}
             onTransitionEnd={()=>this.props.changeColor(this.props.index)}
            >
          {
            this.props.content
          }
        </div>
    )
  }
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.next=this.next.bind(this);
    this.pre=this.pre.bind(this);
    this.move=this.move.bind(this);
    this.clearMove=this.clearMove.bind(this);
    this.hover=this.hover.bind(this);
    this.outLeave=this.outLeave.bind(this);
    this.changeCire=this.changeCire.bind(this);
    this.changeColor=this.changeColor.bind(this);
    this.state={
      number:0,
      moves:null,
      flag:null,
      hover:false,
      obj:[{
        color:"red",
        content:"111"
      },{
        color:"blue",
        content:"222"
      },{
        color:"green",
        content:"333"
      },{
        color:"orange",
        content:"444"
      },{
        color:"purple",
        content:"555"
      }]
    }
  }

  next(){
    this.clearMove();
    let length=this.refs.box.children.length;
    let index=this.state.number;
    if(index<length-1){
      this.setState({
        number:++index
      })
    }else{
      this.setState({
        number:0
      })
    }
  }
  pre(){
    this.clearMove();
    let index=this.state.number;
    let length=this.refs.box.children.length;
    if(index>0){
      this.setState({
        number:--index
      })
    }else{
      this.setState({
        number:length-1
      })
    }
  }

   move(){
     this.setState({
       moves:setInterval(this.next,3000),
       flag: true
     })
  }
  clearMove() {
    clearInterval(this.state.moves);
    this.setState({
      flag: false
    });
  }

  hover(){
    this.clearMove();
    //moves:clearInterval(this.state.moves);
    this.setState({
          hover: true
    })
  }
  outLeave(){
    this.move();
      //setInterval(this.next,3000)
    this.setState({
      hover: false
    });
  }
  //hover几个点
  changeCire(e){
    this.setState({
        number:e
    })
  }
  //停止之后 在自动
  changeColor(value){
    if ((value === this.state.number) && !this.state.flag&&!this.state.hover ) {
      this.move()
    }
  }

  componentDidMount(){
    this.move()
  }

  render() {
    return (
      <div className="App">
        <div className="line"
             onMouseEnter={this.hover}
             onMouseLeave={this.outLeave}
            >
          {
            this.state.obj.map((ele,index)=>{
              return <div className="cire"
                          key={index}
                          style={{backgroundColor:this.state.number===index?"gold":""}}
                          onMouseOver={()=>this.changeCire(index)}
                  ></div>
            })
          }
        </div>
        <div className="box" ref="box">
          {
            this.state.obj.map((val,index)=>{
              return <Page
                  key={"dww"+index}
                  bgcolor={val.color}
                  content={val.content}
                  index={index}
                  number={this.state.number}
                  changeColor={this.changeColor}
                  flag={this.state.flag}
                  />
            })
          }
        </div>
        <button onClick={this.next}>下一页</button>
        <button onClick={this.pre}>上一页</button>
      </div>
    );
  }
}

