import { useEffect, useState} from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { checkExpiredUserToken } from "utils";
import axios from "axios";


const ChartIOS = ({report}) => {

    // const[reportChart, setReportChart] = useState({})
    const COLORS = ["#00C49F", "#FFBB28", "#ED1C24 "];
    
    // useEffect(() => {
    //     checkExpiredUserToken();
        
    //     try {
    //         const report_chart = JSON.parse(sessionStorage.getItem("report"));
            // console.log(report_chart.apk, "chart");
    //         setReportChart(report_chart.ios)
    //         console.log(reportChart, 'report')
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, []);

    // if (report.ios === null){
    //   return;
    // }
    
    const {INFO, WARNING, HIGH } = report
    // console.log(reportChart, 'info')
    const data = [
      { name: "LOW", value: INFO},
      { name: "MEDUIM", value: WARNING },
      { name: "HIGH", value: HIGH},
    ];
    return (
        <ResponsiveContainer width="100%" aspect={2}>
        <PieChart width={800} height={400}>
            
            <Pie
            data={data}
            cx={120}
            cy={100}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Tooltip /> */}
         
          <Legend layout="vertical" verticalAlign="middle" align="right" />
           
          
            
        </PieChart>
        </ResponsiveContainer>
  );
};



export default ChartIOS;