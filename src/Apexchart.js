import './App.css';
import React from 'react'
import ReactApexChart from 'react-apexcharts'

class ApexChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    
      series: [42, 47, 52, 58, 65],
      options: {
        chart: {
          width: 380,
          type: 'polarArea'
        },
        labels: ['Extended Reality', 'Blockchain', 'Cloud Computing', 'Machine Learning', 'AI'],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            },
          }
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
      },
    
    
    };
  }

  render(){
    return (
      <div className="App">
        <header className="App-header container">
                <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="polarArea" width={380} />
              </div>
        </header>
      </div>
    );
  }
}

export default ApexChart;
