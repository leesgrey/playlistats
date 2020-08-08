import { Doughnut } from 'react-chartjs-2';
import React, { Component } from "react";


class ModeDoughnut extends Component {
  constructor(props){
    super(props)
    this.state = {
      labels: ['major', 'minor'],
      datasets: [{
        data: [this.props.major, this.props.minor],
        backgroundColor: ['#FF6384', '#36A2EB']
      }]
    }
    this.getState = this.getState.bind(this);
  }

  getState(){
    return({
      labels: ['major', 'minor'],
      datasets: [{
        data: [this.props.major, this.props.minor],
        backgroundColor: ['#FF6384', '#36A2EB']
      }]
    })
  }


  componentDidUpdate(prevProps) {
    if (this.props !== prevProps){
      this.setState(this.getState())
    }
  }

  render() {
    return(
      <Doughnut data={this.state} key={this.props.minor}/>
    )
  }
}

export default ModeDoughnut;
