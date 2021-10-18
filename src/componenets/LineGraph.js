import Chart from "react-google-charts";

export default function LineGraph(props)
{
    return(
        <>
        <div className="row">
            <div className="col" align="center" style={{overflowY:"hidden", overflowX: "auto"}}>
        {/* <Chart
        width={'1000px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div style={{width:"500px", height:"400px"}}>
        <div class="spinner-border  align-middle" role="status" align="center">
          <span class="visually-hidden">Loading chart...</span>
        </div>
        </div>}
        data={[
            ['x', "Domain1", 'Domain2'],
            ["2010", 0, 0],
            ['2011', 10, 15],
            ['2012', 23, 30],
            ['2013', 17, 20],
            ['2014', 18, 24],
            ['2015', 9, 15],
            ['2016', 11, 20],
            ['2017', 27, 30],
            ['2018', 33, 40],
            ['2019', 40, 45],
            ['2020', 32, 40],
            ['2021', 35, 40],
        ]}
        options={{
            hAxis: {
            title: 'Time',
            },
            vAxis: {
            title: 'Popularity',
            },
        }}
        rootProps={{ 'data-testid': '1' }}
        /> */}
         <Chart
        width={'1000px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div style={{width:"500px", height:"400px"}}>
        <div class="spinner-border  align-middle" role="status" align="center">
          <span class="visually-hidden">Loading chart...</span>
        </div>
        </div>}
        data={props.data}
        options={{
            hAxis: {
            title: 'Year',
            },
            vAxis: {
            title: 'Popularity',
            },
        }}
        rootProps={{ 'data-testid': '1' }}
        />
            </div>
        </div>
    </>
    )
}