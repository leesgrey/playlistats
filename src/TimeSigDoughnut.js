import { Doughnut } from 'react-chartjs-2';
import React, { Component } from "react";

const COLORS = ['#405BD5', '#6F40D5', '#BA40D5', '#D540A5', '#D5405B', '#D56F40']

let labelColors = {4: COLORS[0],
                   3: COLORS[1],
                   1: COLORS[2],
                   2: COLORS[3],
                   5: COLORS[4],
                   6: COLORS[5]}

class TimeSigDoughnut extends Component {
  constructor(props){
    super(props)
    this.state = {
      labels: Object.keys(this.props.sigCount),
      datasets: [{
        data: Object.values(this.props.sigCount),
        backgroundColor: this.getColors(Object.keys(this.props.sigCount))
      }]
    }
    this.getState = this.getState.bind(this);
    this.getColors = this.getColors.bind(this)
  }

  getState(){
    return({
      labels: Object.keys(this.props.sigCount),
      datasets: [{
        data: Object.values(this.props.sigCount),
        backgroundColor: this.getColors(Object.keys(this.props.sigCount))
      }]
    })
  }

  getColors(labels){
    let colors = []
    labels.forEach(function(sig){
      if (labelColors[sig]){
        colors.push(labelColors[sig])
      }
      else {
        colors.push('rgba(' + Math.floor(Math.random() * 255).toString() + ', ' + Math.floor(Math.random() * 255).toString() + ', ' + Math.floor(Math.random() * 255).toString() + ')')
      }
    })
    return colors;
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps){
      this.setState(this.getState())
    }
  }

  render() {
    return(
      <Doughnut data={this.state} key={this.props}/>
    )
  }
}

export default TimeSigDoughnut;
