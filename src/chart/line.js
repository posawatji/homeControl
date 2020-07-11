import React,{useState, useEffect} from "react";
import { Line } from "react-chartjs-2";
import "./css/charts.css";
import axios from 'axios';

// day
export const LineDayHis = () =>{
  useEffect(() => {
    const interval = setInterval(() => {
      loadDayUsageF1();    
      loadDayUsageF2();    
    // console.log('DayHis');
  }, 1000);
  return () => clearInterval(interval);
  
    
},[]);
//floor1
  const [dayF1, setDayF1] = useState([]);
  const urlF1 = `http://watthomeapi.jp.ngrok.io/wattperhoursperhourfloor1/`;

  const loadDayUsageF1 = async () => {
    try {
      const res = await axios.get(urlF1);
      setDayF1(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Cancel axios data source on error");
      } else {
        throw error;
      }
    }
  };
// floor2
  const [dayF2, setDayF2] = useState([]);
  const urlF2 = `http://watthomeapi.jp.ngrok.io/wattperhoursperhourfloor2/`;

  const loadDayUsageF2 = async () => {
    try {
      const res = await axios.get(urlF2);
      setDayF2(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Cancel axios data source on error");
      } else {
        throw error;
      }
    }
  };

//   let labelsF1 = dayF1.map( d => {
//     return d.Time;
//  });
  let dataF1 = dayF1.map( d => {
    // console.log(d.wattperhoursperhour)
    return d.wattperhoursperhour/(3600*1000);
 });;

//  let labelsF2 = dayF2.map( d => {
//   return d.Time;
// });
let dataF2 = dayF2.map( d => {
  // console.log(d.wattperhoursperhour)
  return d.wattperhoursperhour/(3600*1000);
});;


//chartDay
  const state = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    datasets: [
      {
        label: 'floor1',
        borderColor: 'rgba(75, 192, 192, 0.5)',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255,0.2)',
        data: dataF1,
      },
      {
        label: 'floor2',
        borderColor: 'rgba(255, 99, 132)',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255,0.2)',
        data: dataF2,
      },
    ]
  };

    return (
      <div>
        <div className="lineChart">
          <Line
            data={state}
            width={100}
            height={80}
            options={{
              responsive:true,
              // barValueSpacing: 2,
              elements: {
                point:{
                    radius: 2
                }
              },
              title: {
                display: true,
                text: "Usage per Day (Units)",
                  fontSize: 15,
                  fontColor:"#000000"
              },
              legend: {
                display: true,
                position: "top",
                responsive: true,
                fontColor:"#000000",
              },
              scales: {
                xAxes: [{
                  ticks: {
                    maxRotation: 0,
                    maintainAspectRatio: true
                },
                }]
            }
            }
          }
          />
        </div>
      </div>
    );
  }



// month
  export const LineMonth = () =>{

    useEffect(() => {
      const interval = setInterval(() => {
        loadMonthUsage();
        // console.log('MonthHis');
      }, 1000);
      return () => clearInterval(interval);
      
},[]);

    const [month, setMonth] = useState([]);
    const url = `http://watthomeapi.jp.ngrok.io/wattperhoursperyear/`;
    
    // https://5e39272daad2220014962402.mockapi.io/api/test/lineMonthHisApi
    const loadMonthUsage = async () => {
      try {
        const res = await axios.get(url);
        setMonth(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Cancel axios data source on error");
        } else {
          throw error;
        }
      }
    };
  //   let labels = month.map( d => {
  //     return d.id;
  //  });
    let data1F1 = month.map( d => {
      // console.log(d.floor1)
      return d.wattperhourspermonth/(3600*1000);
   });;
  //  let data1F2 = month.map( d => {
  //   // console.log(d.floor2)
  //   return d.wattperhourspermonth/(3600*1000);
  // });;
  
    const state1 = {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12],
      datasets: [
        {
          label: 'overall',
          borderColor: 'rgba(75, 192, 192, 0.5)',
          borderWidth: 2,
                  
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          data: data1F1,
        },
        // {
        //   label: 'floor2',
        //   borderColor: 'rgba(255, 99, 132)',
        //   borderWidth: 1,
        //   backgroundColor: 'rgba(255, 255, 255,0.2)',
        //   data: data1F2,
        // },
      ]
    };
      return (
        <div>
          <div className="lineChart">
            <Line
              data={state1}
              width={100}
              height={80}
              options={{
                responsive:true,
                elements: {
                  point:{
                      radius: 5
                  }
                },
                title: {
                  display: true,
                  text: "Usage per Month (Units)",
                  fontSize: 15,
                  fontColor:"#000000"
                },
                legend: {
                  display: true,
                  position: "top",
                  responsive: true,
                },
                scales: {
                  xAxes: [{
                    ticks: {
                      maxRotation: 0,
                      maintainAspectRatio: true
                  },
                }]
              }
              }}
            />
          </div>
        </div>
      );
    }
