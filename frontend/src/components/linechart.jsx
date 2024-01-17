import {
    LineChart,
    Scatter,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
  } from "recharts";

const Linechart = ( {data} ) =>{
    
    return(
        <ResponsiveContainer width="90%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="notes" stroke="#8884d8"/>
                
                {/* <Line type="monotone" dataKey="notes" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                {/* <Line type="monotone" dataKey="words" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Linechart;