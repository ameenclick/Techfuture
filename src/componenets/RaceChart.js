import ChartRace from 'react-chart-race';
import React, { Component } from 'react';


export default class RaceChart extends Component{
 
    constructor(props){
      super(props);
      var years=Object.keys(this.props.data)
      console.log(this.props.data)
      this.state = {
        data: [],
        year: "",
        min: parseInt(years[0]),
        max: parseInt(years[years.length-1])
      };
      console.log(this.state.min,this.state.max)
    }
   
     componentDidMount()
     {
         let i=2013
         let intervalId=setInterval(() => {
             if(i<=this.state.max)
             {
                 this.setState({ data: this.props.data[i],
                     year: i});
                     i=i+1
                document.getElementById("years").innerHTML="<h2>"+this.state.year+"</h2>"
             }
           }, 2000);
        this.setState({ intervalId: intervalId })
     }

     componentWillUnmount(){
        document.getElementById("years").innerHTML=""
        clearInterval(this.state.intervalId)
      }


    render(){
      return(
        <div>
            <div className="row">
                <ChartRace
                    data={this.state.data}
                    backgroundColor='white'
                    width={760}
                    padding={12}
                    itemHeight={58}
                    gap={12}
                    titleStyle={{ font: 'normal 400 13px Arial', color: '#000' }}
                    valueStyle={{ font: 'normal 400 11px Arial', color: '#000' }}
                />
          </div>
        </div>
      );
    }
   
  }