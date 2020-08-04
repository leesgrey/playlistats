import { Doughnut } from 'react-chartjs-2';
import React, { Component } from "react";

class ModeDoughnut extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        labels: ['major', 'minor'],
        datasets: [{
          data: [this.props.major,this.props.minor],
          backgroundColor: [
          		'#FF6384',
          		'#36A2EB'
          		]
        }]
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      console.log("updating donut")
      console.log(this.props.id + " " + this.props.major)
      this.setState({
        data: {
          labels: ['major', 'minor'],
          datasets: [{
            data: [this.props.minor, this.props.major],

          backgroundColor: [
          		'#FF6384',
          		'#36A2EB'
          		]
          }]
        }
      })
    }
  }

  render() {
    return(
      <Doughnut data={this.state.data} key={this.props.minor}/>
    )
  }
}

export default ModeDoughnut;
