import React from 'react'
import Chart from "react-google-charts";
import Tree from 'react-d3-tree';
// import Tree from 'react-tree-graph';

class Subdomain extends React.Component {

    constructor(props)
    {
      super(props)
      this.state= {
        domain : props.domain,
        treeData: {},
        graphData : [],
        suggestions : [],
        publications: 0,
        patents : 0,
        search: "",
        height: 400,
        width: (window.innerWidth >= 1000)? 1000: window.innerWidth
      }
      this.getDetails = this.getDetails.bind(this)
    }

    getURL(s) 
    {
      let domain = ""
      for (let i = 0; i < s.length; i++) 
      {
          if(s[i] === " ")
          {
            domain += '_'
          }
          else if(s[i] === "/")
          {
            domain += '$'
          }
          else
          {
            domain += s[i]
          }
      }
      return domain
    }

    componentDidMount() {
        // setInterval(() => {
        //   this.forceUpdate();
        // }, 3000);
        let url = "https://tech-futures-backend.herokuapp.com/graph/"+this.getURL(this.state.domain)
        //let url = "http://127.0.0.1:5000/graph/"+this.getURL(this.state.domain)
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
              // console.log(result.data)
              this.setState({treeData : result.treeData,
                              graphData:result.graphData, 
                              suggestions : result.suggestions});
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

      setStateHelper(event,result)
      {
        console.log(result.Publications)
        this.setState({publications : result.Publications, patents : result.Patents})
        let searchText = this.state.search
        let target = document.getElementById("search-result")
        if(searchText !== "")
        {
          target.innerHTML = "<div><h2> Publications : "+this.state.publications.toString()+"</h2><h2>Patents : "+this.state.patents.toString()+"</h2></div>"
        }
        event.preventDefault()
      }
    
      getDetails(event)
      {
        let searchText = this.state.search
        // let publications = this.state.publications,patents = this.state.patents
        let target = document.getElementById("search-result")
        if(searchText !== "")
        {
          // let data = this.state.subdomains
          // // console.log(data)
          // for (let i = 1; i < data.length; i++)
          // {
          //   if(searchText === data[i][0])
          //   {
          //     publications = data[i][1]
          //     patents = data[i][2]
          //     // console.log(publications,patents)
          //     break
          //   }
          // }
          // event.preventDefault()
          let url = "https://tech-futures-backend.herokuapp.com/springer/"+this.getURL(searchText)
          //let url = "http://localhost:5000/springer/"+this.getURL(searchText)
          fetch(url)
          .then(res => res.json())
          .then(
              (result) => {
                console.log("******************************")
                this.setStateHelper(event,result)
              },
              (error) =>{
                  console.log(error)
              }
          )
        }
      }
      
      showNodeData(node,e)
      {
        // console.log(node.data.name)
        let target = document.getElementById("hovered")
        target.innerHTML = "<h3 class='mt-2 me-2 bg-secondary text-light rounded p-2'>"+node.data.name+"</h3>"
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
            {/* <h3>Subdomains in {this.state.domain}</h3> */}
            <div className="container">
            <div className="row my-5 justify-content-center">
                 <h2>Check the hirarchy of <em>{this.state.domain}</em> here...</h2>
                  {this.state.graphData.length === 0 ? <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div> : 
                    <div >
                        <div class="border border-dark rounded" id="tree" style={{ width: 'auto', height: '25em' }}>
                        <div className="overflow-visible">
                            <div className="float-end"  id="hovered"></div>
                        </div>
                        <Tree initialDepth={0} 
                              orientation={"horizontal"}
                              // depthFactor={250} 
                              // nodeSize = {{"x": 200, "y": 200}}
                              onNodeMouseOver = {(node,e) =>{this.showNodeData(node,e)}} 
                              data={this.state.treeData} />
                        
                        <div id="node-details"></div>
                        </div>
                        <div style={{ overflowX: "scroll"}}>
                        <Chart
                          width={1000}
                          height={500}
                          chartType="BubbleChart"
                          loader={<div style={{width:"500px", height:"400px"}}>
                            <div class="spinner-border  align-middle" role="status" align="center">
                              <span class="visually-hidden">Loading chart...</span>
                            </div>
                            </div>}
                          data={this.state.graphData}
                          options={{
                            title: "Graph showing Publications and Patents in subdomains in "+this.state.domain,
                            hAxis: { title: 'Publications' },
                            vAxis: { title: 'Patents' },
                            bubble: { textStyle: { fontSize: 11 } },
                          }}
                        />
                        </div>
                    </div>}
            </div>
            <div className="row justify-content-center">
            <h3>Search for details of other subdomains</h3>
                <div className="col-lg-4 mt-1 " align="center">
                    <div className="input-group rounded-pills">
                        <input type="text" list="domains" class="form-control form-control-lg" onChange={()=> this.setDatalist()} onInput={(e)=>this.setState({ search: e.target.value})} placeholder="Search subdomain..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <button className="btn btn-outline-dark" onClick = {(e) => this.getDetails(e)}>
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
                <div className="col" align="center"  id="search-result">
                {this.state.publications !== 0 ? <div>Publications : {this.state.publications}</div>
                                               : <div></div>}
                </div>
            </div>
            <div className="row">
                <div className="col" align="center">
                <div className="col my-5">
                    <button type="button" class="btn btn-lg btn-primary">Explore</button>
                </div>
            </div>
            </div>
            </div>
        </>
        );
      }
}

export default Subdomain;