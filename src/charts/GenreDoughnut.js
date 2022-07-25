import { Doughnut } from 'react-chartjs-2';
import React, { Component } from "react";

class GenreDoughnut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labels: Object.keys(this.props.genres),
      datasets: [{
        data: Object.values(this.props.genres),
        backgroundColor: this.getColors(Object.keys(this.props.genres))
      }]
    }
  this.getState = this.getState.bind(this);
  this.getColors = this.getColors.bind(this);
  }

  getState(){
    return({
      labels: Object.keys(this.props.genres),
      datasets: [{
        data: Object.values(this.props.genres),
        backgroundColor: this.getColors(Object.keys(this.props.genres))
      }]
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps){
      this.setState(this.getState())
    }
  }

  getColors(genres) {
    let colors = []
    genres.forEach(() => {
      colors.push('rgba(' + Math.floor(Math.random() * 255).toString() + ', ' + Math.floor(Math.random() * 255).toString() + ', ' + Math.floor(Math.random() * 255).toString() + ')')
    })
    return colors;
  }

  render() {
    return (
      <Doughnut
        data={this.state}
        key={this.props}
        options={{ legend: { position: 'right', labels: { fontColor: '#ece6e1' }}}}
      />
    )
  }
}

export default GenreDoughnut;