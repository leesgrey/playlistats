import { Scatter } from "react-chartjs-2";
import React, { Component } from "react";

const axisRanges = {
  "acousticness": {
    suggestedMin: 0,
    suggestedMax: 1
  },
  "danceability": {
    suggestedMin: 0,
    suggestedMax: 1
  },
  "energy": {
    suggestedMin: 0,
    suggestedMax: 1
  },
  "instrumentalness": {
    suggestedMin: 0,
    suggestedMax: 1
  },
  "liveness": {
    suggestedMin: 0,
    suggestedMax: 1
  },
  "loudness": {
    suggestedMin: -60,
    suggestedMax: 0
  },
  "speechiness": {
    suggestedMin: 0,
    suggestedMax: 1
  },
  "tempo": {},
  "valence": {
    suggestedMin: 0,
    suggestedMax: 1
  }
}

class CustomGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datasets: [{
        data: this.props.customX.map((x, idx) => (
          {
            x: x || 0,
            y: this.props.customY[idx] || 0
          }
        ))
      }]
    }
  }

  getState(){
    return({
      label: 'Custom Graph',
      datasets: [{
        data: this.props.customX.map((x, idx) => (
          {
            x: x || 0,
            y: this.props.customY[idx] || 0
          }
        ))
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
      <Scatter
        data={this.state}
        options={{
          scales: {
            xAxes: [{
              ticks: {
                fontColor: '#ece6e1',
                ...axisRanges[this.props.xLabel]
              },
              scaleLabel: {
                display: true,
                labelString: this.props.xLabel || '',
                fontColor: '#ece6e1'
              }
            }],
            yAxes: [{
              ticks: {
                fontColor: '#ece6e1'
              },
              scaleLabel: {
                display: true,
                labelString: this.props.yLabel || '',
                fontColor: '#ece6e1'
              }
            }],
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              backgroundColor: '#d66767',
              borderColor: '#ece6e1'
            },
            line: {
              showLine: true
            }
          },
          tooltips: {
            callbacks: {
              label: (context) => this.props.labels[context.index]
            }
          }
        }}
      />
    )
  }
}

export default CustomGraph;