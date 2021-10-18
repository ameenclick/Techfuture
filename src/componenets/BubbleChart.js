
import React from 'react'
import Chart from "react-google-charts";
 


class Bubble extends React.Component {

    constructor(props)
    {
      super(props)
      var date = new Date()
      this.state= {
        curretYear : date.getFullYear(),
        after5Year : date.getFullYear()+5,
        domains: [],
        search: ""
      }
    }

    componentDidMount() {
        setInterval(() => {
          this.forceUpdate();
        }, 3000);
        fetch("http://127.0.0.1:5000/domains")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                  domains:result.domains
                });
                console.log("Fetch")
            },
            (error) =>{

                console.log(error)
            }
        )
      }

      setDatalist()
      {
            var datalist = document.querySelector("datalist");
            if(this.state.search === "")
            {
                datalist.id=""
            }
            else
            {
                datalist.id="domains"
            }
      }
    
      render() {
        return (
          <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><b>TechFuture</b></a>
                    <form class="d-flex">
                        <button class="btn btn-outline-primary" type="submit">Explore More</button>
                    </form>
                </div>
            </nav>
            <div className="container">
            <div className="row my-5 justify-content-center">
                    {// Trend Graph
                    }
                        <Chart
                          width={500}
                          height={400}
                          chartType="BubbleChart"
                          loader={<div style={{width:"500px", height:"400px"}}>
                            <div class="spinner-border  align-middle" role="status" align="center">
                              <span class="visually-hidden">Loading chart...</span>
                            </div>
                            </div>}
                          data={[
                            ['ID', 'Total_Papers', 'Growth_Rate', 'Technology', 'Mean_Score'],
                            ['Extended Reality', 3000 , 0.4, 'Extended Reality', 75],
                            ['IOT', 4000, 0.5, 'IOT', 80],
                            ['Quantum', 6000, 0.8, 'Quantum', 110],
                            ['BlockChain', 5000, 0.6, 'BlockChain', 80],
                            ['AI', 7500, 0.9, 'AI', 140]
                          ]}
                          options={{
                            title:
                              'Total No. of Papers vs Growth Rate in Trending Technologies X=Total No. of Papers, ' +
                              '',
                            hAxis: { title: 'Total No. of papers' },
                            vAxis: { title: 'Growth Rate' },
                            bubble: { textStyle: { fontSize: 11 } },
                          }}
                        />
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 mt-1 " align="center">
                    <div class="input-group rounded-pills">
                        <input type="text" list="domains" class="form-control form-control-lg" onChange={()=> this.setDatalist()} onInput={(e)=>this.setState({ search: e.target.value})} placeholder="Search domain..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        </span>
                    </div>
                    <datalist id="">
                            {this.state.domains.map((domain) =>
                                <option>{domain}</option>
                            )}
                        </datalist>
                </div>
            </div>
            <div className="row">
                <div className="col" align="center">
                <div className="col my-5">
                    <button type="button" class="btn btn-lg btn-primary">Explore</button>
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col" align="center">
                    <strong>These technologies is booming in {this.state.curretYear} ,Have huge potential to grow by {this.state.after5Year} </strong>
                </div>
            </div>
            </div>
        </>
        );
      }
}

export default Bubble;