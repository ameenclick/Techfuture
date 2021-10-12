import './css/LandingPage.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import Subdomain from './Subdomain';

function LandingPage(){
    var date = new Date()
    const curretYear = date.getFullYear();
    const after5Year = curretYear+5;
    const [words, setWords] = useState([]);
    const [domains, setDomains] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const screenWidth = (window.innerWidth >= 1000)? 1000: window.innerWidth


    
    useEffect(() => {
        fetch("http://127.0.0.1:5000/domains")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setWords(result["mainDomains"])
                setDomains(result["top50"])
                console.log(screenWidth)
            },
            (error) =>{
                setIsLoaded(true);
                console.log(error)
            })
    }, [])


    function subdomainClick(d)
    {
        if(d)
        {
            ReactDOM.render(<Subdomain domain={d}/>, document.getElementById("main"));
        }
    }

    function cloudAction(word){
        var hoverLabel="<b>"+word.text+"</b><br/>Frequency:("+word.value+")"
        document.getElementById("hovered").innerHTML=hoverLabel
    }

      const callbacks = {
        getWordColor: word => word.value > 5 ? "blue" : "red",
        onWordClick: word => subdomainClick(word.text),
        onWordMouseOver: word => console.log(word.text),
        getWordTooltip: word => cloudAction(word),
      }
      const options = {
        rotations: 1,
        rotationAngles: [0],
      };
      const size = [screenWidth,400];

      function setDatalist()
      {
            var datalist = document.querySelector("datalist");
            if(document.getElementById("search").value === "")
            {
                datalist.id=""
            }
            else
            {
                datalist.id="domains"
            }
      }
      

    return(
        <>
        <div id="main">
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><b>TechFuture</b></a>
                    <form className="d-flex">
                        <button className="btn btn-outline-primary" type="submit">Explore More</button>
                    </form>
                </div>
            </nav>
            <div className="container">
            <div className="fixed-top mt-5 me-5">
                <div className="float-end"  id="hovered">

                </div>
            </div>
            <div className="row" id="visualisation" align="center">
                    {// Trend Graph
                    }
            {(isLoaded)?
                 <ReactWordcloud
                 callbacks={callbacks}
                 options={options}
                 size={size}
                 words={words}
                 />:
                <div className="row justify-content-center">
                    <div class="spinner-border" role="status" align="center">
                        <span class="visually-hidden">Loading chart...</span>
                    </div>
               </div>
            }
                   
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 " align="center">
                    <div class="input-group rounded-pills">
                        <input type="text" id="search" list="domains" class="form-control form-control-lg" onInput={()=>{ setDatalist()}} placeholder="Search domain..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <button class="btn btn-outline-dark" onClick={() => subdomainClick(document.getElementById('search').value)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        </button>
                    </div>
                    <datalist id="">
                            {domains.map((domain) =>
                                <option >{domain.text}</option>
                            )}
                        </datalist>
                </div>
            </div>
            <div className="row">
                <div className="col" align="center">
                <div className="col mt-5 mb-4">
                    <button type="button" class="btn btn-lg btn-primary">Explore</button>
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col" align="center">
                    <strong>These technologies is booming in {curretYear} ,Have huge potential to grow by {after5Year} </strong>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default LandingPage