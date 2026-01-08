import { Doughnut } from "react-chartjs-2";
import React, { Component } from "react";

export const labelColors = {
  "0+": "#f9ddab",
  "0-": "#FCF0DB",
  "2+": "#f9a706",
  "2-": "#FAB938",
  "1+": "#ff6704",
  "1-": "#FF8637",
  "3+": "#e7062e",
  "3-": "#F9274C",
  "5+": "#a2217e",
  "5-": "#CC2A9F",
  "4+": "#511296",
  "4-": "#6A17C4",
  "6+": "#020759",
  "6-": "#030B8B",
  "8+": "#114fc6",
  "8-": "#1E65EC",
  "7+": "#038c5e",
  "7-": "#04BE80",
  "9+": "#7fc24f",
  "9-": "#9BCF75",
  "11+": "#1b998b",
  "11-": "#23C4B2",
  "10+": "#9fa713",
  "10-": "#CBD518",
};

export const KEYNAMES: Record<string, string> = {
  "0+": "C major",
  "0-": "C minor",
  "1+": "C♯/D♭ major",
  "1-": "C♯/D♭ minor",
  "2+": "D major",
  "2-": "D minor",
  "3+": "D♯/E♭ major",
  "3-": "D♯/E♭ minor",
  "4+": "E major",
  "4-": "E minor",
  "5+": "F major",
  "5-": "F minor",
  "6+": "F♯/G♭ major",
  "6-": "F♯/G♭ minor",
  "7+": "G major",
  "7-": "G minor",
  "8+": "G♯/A♭ major",
  "8-": "G♯/A♭ minor",
  "9+": "A major",
  "9-": "A minor",
  "10+": "A♯/B♭ major",
  "10-": "A♯/B♭ minor",
  "11+": "B major",
  "11-": "B minor",
};

class KeyDoughnut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: Object.keys(this.props.data).map((x) => KEYNAMES[x]),
      datasets: [
        {
          data: Object.values(this.props.data),
          backgroundColor: this.getColors(Object.keys(this.props.data)),
        },
      ],
    };
    this.getState = this.getState.bind(this);
    this.getColors = this.getColors.bind(this);
    this.getModeColors = this.getModeColors.bind(this);
  }

  getState() {
    return {
      labels: Object.keys(this.props.data).map((x) => KEYNAMES[x]),
      datasets: [
        {
          data: Object.values(this.props.data),
          backgroundColor: this.getColors(Object.keys(this.props.data)),
        },
      ],
    };
  }

  getColors(labels) {
    let colors = [];
    labels.forEach(function (sig) {
      colors.push(labelColors[sig]);
    });
    return colors;
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState(this.getState());
    }
  }

  getModeColors(labels) {
    let colors = [];
    labels.forEach(function (sig) {
      if (labelColors[sig]) {
        colors.push(labelColors[sig]);
      } else {
        colors.push(
          "rgba(" +
            Math.floor(Math.random() * 255).toString() +
            ", " +
            Math.floor(Math.random() * 255).toString() +
            ", " +
            Math.floor(Math.random() * 255).toString() +
            ")"
        );
      }
    });
    return colors;
  }

  render() {
    return (
      <Doughnut
        data={this.state}
        key={this.props}
        options={{
          legend: { position: "right", labels: { fontColor: "#ece6e1" } },
        }}
      />
    );
  }
}

export default KeyDoughnut;
