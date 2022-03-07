import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import NUMERICAL_TO_DATE_CONSTANTS from "../../../../../Utils/NumericalToDateConstants.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    }
  },
};

/*

  {
    label: 'Completion Rate',
    data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    yAxisID: 'y1',
  }
*/

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const ChartDisplay=(props)=>{
  let {
    visitorsDataset,
    completionDataset,
    xAxisLabels,
    timeRequestedType
  }=props;
  console.log(props);

  const [isDataReformatComplete,changeIsDataReformatComplete]=useState(false);
  const [chartData,changeChartData]=useState();

  useEffect(()=>{
    debugger;
    if(timeRequestedType=='month'){
      xAxisLabels=reformatMonthLabels();
    }
    const data = {
      labels:xAxisLabels,
      datasets: [
        {
          label: 'Unique Visitors',
          data:visitorsDataset,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Completion Rate',
          data:completionDataset,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y',
        }
      ],
    };
    changeChartData(data);
    changeIsDataReformatComplete(true);
  },[
    timeRequestedType,
    visitorsDataset,
    completionDataset
  ]);

  const reformatMonthLabels=()=>{
    debugger;
    for(var i=0;i<xAxisLabels.length;i++){
      const month=NUMERICAL_TO_DATE_CONSTANTS.month[xAxisLabels[i]];
      xAxisLabels[i]=month
    }
    return xAxisLabels;
  }

  return (
    <React.Fragment>
      {isDataReformatComplete==false?
        <p>Rendering...</p>:
        <Line 
          options={options} 
          data={chartData} 
        />
      }
    </React.Fragment>
  );
}

export default ChartDisplay;
