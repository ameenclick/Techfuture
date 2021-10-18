import React from 'react'
import Chart from "react-google-charts";
 


class Subdomain extends React.Component {

    constructor(props)
    {
      super(props)
      // var date = new Date()
      this.state= {
        domain : props.domain,
        subdomains: [],
        suggestions : [],
        search: "",
        width: (window.innerWidth>=1000)?1000:window.innerWidth
      }
    }

    componentDidMount() {
        setInterval(() => {
          this.forceUpdate();
        }, 3000);
        let domain = ""
        for (let i = 0; i < this.state.domain.length; i++) 
        {
            if(this.state.domain[i] === " ")
            {
                domain += '_'
            }
            else
            {
                domain += this.state.domain[i]
            }
        }
        //let url = "http://127.0.0.1:5000/"+this.state.domain
        let url = "https://tech-futures-backend.herokuapp.com/"+domain
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
              // console.log(result.data)
              this.setState({subdomains : result.data, suggestions : result.suggestions});
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
    
      getDetails()
      {
        let searchText = this.state.search
        let publications=0,patents=0
        let target = document.getElementById("search-result")
        if(searchText !== "")
        {
          let data = this.state.subdomains
          // console.log(data)
          for (let i = 1; i < data.length; i++)
          {
            if(searchText === data[i][0])
            {
              publications = data[i][1]
              patents = data[i][2]
              // console.log(publications,patents)
              break
            }
          } 
          target.innerHTML = "<div><h2> Publications : "+publications.toString()+"</h2><h2>Patents : "+patents.toString()+"</h2></div>"
        }
      }

      render() {
        return (
          <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand"><b>TechFuture</b></a>
                    <form className="d-flex">
                        <button className="btn btn-outline-primary" type="submit">Explore More</button>
                    </form>
                </div>
            </nav>
            {/* <h3>Subdomains in {this.state.domain}</h3> */}
            <div className="container">
            <div className="row mb-5 justify-content-center">
                    {// Trend Graph
                    }
                        <Chart
                          width={this.state.width}
                          height={400}
                          chartType="BubbleChart"
                          loader={<div style={{width:"200px", height:"400px"}}>
                            <div class="spinner-border  align-middle" role="status" align="center">
                              <span class="visually-hidden">Loading chart...</span>
                            </div>
                            </div>}
                          data={ this.state.subdomains.slice(0,7)}
                          options={{
                            title: "Graph showing Publications and Patents in subdomains in "+this.state.domain,
                            hAxis: { title: 'Publications' },
                            vAxis: { title: 'Patents' },
                            bubble: { textStyle: { fontSize: 11 } },
                          }}
                        />
            </div>
            <div className="row justify-content-center">
            <h3>Search for details of other subdomains</h3>
                <div className="col-lg-4 mt-1 " align="center">
                    <div className="input-group rounded-pills">
                        <input type="text" list="domains" class="form-control form-control-lg" onChange={()=> this.setDatalist()} onInput={(e)=>this.setState({ search: e.target.value})} placeholder="Search domain..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <button className="btn btn-outline-dark" onClick = {this.getDetails()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        </button>
                    </div>
                    <datalist id="">
                            {this.state.suggestions.map((domain) =>
                                <option>{domain}</option>
                            )}
                        </datalist>
                </div>
            </div>
            <div className="row">
                <div className="col" align="center"  id="search-result"></div>
            </div>
            <div className="row">
                <div className="col" align="center">
                <div className="col my-5">
                    <button type="button" class="btn btn-primary">Explore</button>
                </div>
            </div>
            </div>
            </div>
        </>
        );
      }
}

export default Subdomain;