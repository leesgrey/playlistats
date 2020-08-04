import { Doughnut } from 'react-chartjs-2';
import React, { Component } from "react";

class KeyGraph extends Component {


  render() {
    return(
      <Doughnut data={this.state.data} key={this.props.minor}/>
    )
  }
}

export default KeyGraph
