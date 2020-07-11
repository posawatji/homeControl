import React, { useEffect, useState } from "react";
import "../App.css";
import "../components/css/dashboard.css";
import { LineDayHis, LineMonth } from "../chart/line";
import AirCondition from "../asset/air-conditioner.png";
import LightBulb from "../asset/light-bulb.png";
import PlugLine from "../asset/plug.png";
import axios from 'axios';


function Dashboard() {
  useEffect(() => {
    // calculate();
    loadDayUsage1F1()
    loadDayUsageF1();
    loadDayUsageF2();
    loadMonthUsage();
    const interval = setInterval(() => {
      loadDayUsage1F1();
      loadDayUsageF1();
      loadDayUsageF2();
      loadMonthUsage();
    }, 10000);
    return () => clearInterval(interval);

  }, []);

  const [wattDay, setWattDay] = useState([]);
  const url1F1 = `http://watthomeapi.jp.ngrok.io/wattperhoursperday/`;

  const loadDayUsage1F1 = async () => {
    try {
      const res = await axios.get(url1F1);
      setWattDay(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Cancel axios data source on error");
      } else {
        throw error;
      }
    }
  };




  //floor1
  const [dayF1, setDayF1] = useState([]);
  const urlF1 = `http://watthomeapi.jp.ngrok.io/wattperhoursperhourfloor1/`;


  const loadDayUsageF1 = async () => {
    try {
      const res = await axios.get(urlF1);
      setDayF1(res.data);
      console.log(res.data)
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

  const [month, setMonth] = useState([]);
  const url = `http://watthomeapi.jp.ngrok.io/wattperhoursperyear/`;


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

  let testArr = month.map(d => parseInt(d.wattperhourspermonth), [])
  console.log(testArr,"NaNtest")


  let lastMonth = testArr[testArr.length - 1];
  let lastMonths = lastMonth / (3600 * 1000);
  console.log(lastMonths, "Months");


  // let total=0;

  // for (let i in testArr) {
  //   total += parseInt(testArr[i]);
  // console.log("total "+testArr[i]+" "+total)

  // }
  // console.log(total)

  // let asd=[];

  // let data1F1 = month.map( d =>{


  // for (let i in d.floor1) {
  // asd.push(d.floor1[i])
  // console.log(asd)
  //   total += parseInt(testArr[i]);
  // console.log("total "+testArr[i]+" "+total)

  // }
  // return (d.wattperhourspermonth)/(3600*1000);
  // console.log(asd)
  //  });;


  let dataF1 = dayF1.map(d => parseInt(d.wattperhoursperhour), [])
  // console.log(dataF1)

  let wattperhourF1 = parseInt(dataF1[dataF1.length - 1]);
  let wattperhourF1Unit = wattperhourF1 / (3600 * 1000);
  console.log(wattperhourF1Unit);



  // let dataF1 = dayF1.map(d => {
  //   // console.log((d.wattperhoursperhour));

  //   return d.wattperhoursperhour / (3600 * 1000);
  // });


  let dataF2 = dayF2.map(d => parseInt(d.wattperhoursperhour), [])
  // console.log(dataF2)

  let wattperhourF2 = dataF2[dataF2.length - 1];
  let wattperhourF2Unit = wattperhourF2 / (3600 * 1000);
  // console.log(wattperhourF2Unit);

  let wattPerAll = parseInt((wattperhourF1Unit) + (wattperhourF2Unit))
  console.log(wattPerAll, "sum")



  const calculate = (data) => {
    let x = (data);
    let x1 = 0;
    let z = 0;
    let y = 0;
    if (x <= 15) {
      y = (x * 2.34);
      // console.log(y);
    } else if (x > 15 && x <= 25) {
      x1 = (x - 15);
      z = (x1 * 2.98);
      y = (z + 35.23)
      // console.log(y);
    } else if (x > 25 && x <= 35) {
      x1 = (x - 25)
      z = (x1 * 3.241)
      y = (z + 65.11)
      console.log(y);
    }
    else if (x > 35 && x <= 100) {
      x1 = (x - 35)
      z = (x1 * 3.623)
      y = (z + 97.53)
      console.log(y);
    }
    else if (x > 100 && x <= 150) {
      x1 = (x - 100)
      z = (x1 * 3.7172)
      y = (z + 333.06)
      console.log(y);
    }
    else if (x > 150 && x <= 400) {
      x1 = (x - 150)
      z = (x1 * 4.2218)
      y = (z + 518.92)
      console.log(y);
    }
    else if (x > 400) {
      x1 = (x - 400)
      z = (x1 * 4.4218)
      y = (z + 1574.37)
      //  console.log(y);
    }
    // console.log(y)
    return parseInt(y)
  }

  // console.log(calculate())


  return (


    <div className="dashboard">

      <div className="dash">
        <div>
          <div className="dayDash">

            <div className="boxChart">
              <div className="dayHis">
                {/* <div className="titleDayOverview">
                  Overview
                </div> */}
                <div className="lineDayHis">
                  <div>
                    <LineDayHis />
                  </div>
                  <div className="powerUsage2F">
                  <div className="lastHourandMonth">Now </div>
                    <div className="box-apiDataPU">
                      <div className="apiDataPU">
                        <div className="DataPU">{wattPerAll}</div>
                        <div className="unit">Units</div>
                      </div>

                      <div className="apiDataPU">
                        <div className="DataPU">{calculate(wattPerAll)}</div>
                        <div className="unit">Baht</div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
              {/* <div className="monthDash"> */}
              <div className="dayHis">
                {/* <div className="titleDayOverview">y
                  Overview
                    </div> */}
                <div className="lineDayHis">
                  <div>
                    <LineMonth />
                  </div>
                  <div className="powerUsage2F">

                    <div className="lastHourandMonth">lastMonth</div>
                    <div className="box-apiDataPU">
                      <div className="apiDataPU">
                        <div className="DataPU">{parseInt(lastMonths)}</div>
                        <div className="unit">Units</div>
                      </div>

                      <div className="apiDataPU">
                        <div className="DataPU">{calculate(lastMonths)}</div>
                        <div className="unit">Baht</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}
            <div className="statAllKw">
              <div className="MHD">
                <div className="statTittle">Floor1</div>
                <div className="stat">
                  <div className="cardPowerUsageData">
                    <div className="iconUse"><img src={AirCondition} alt="AirCondition" width="40%"></img></div>
                    <div className="dataUse">
                      <div>{parseInt(wattDay.filter(data => data.orderID === 1).map(data => data.wattperhoursperday) / 1000)} Kw</div>
                    </div>

                  </div>
                  <div className="cardPowerUsageData">
                    <div className="iconUse"><img src={LightBulb} alt="LightBulb" width="40%"></img></div>
                    <div className="dataUse">
                      <div>{parseInt(wattDay.filter(data => data.orderID === 2).map(data => data.wattperhoursperday) / 1000)} Kw</div>
                    </div>
                  </div>
                  <div className="cardPowerUsageData">
                    <div className="iconUse"><img src={PlugLine} alt="PlugLine" width="40%"></img></div>
                    <div className="dataUse">
                      <div>{parseInt(wattDay.filter(data => data.orderID === 3).map(data => data.wattperhoursperday) / 1000)} Kw</div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="MHD">
                <div className="statTittle">Floor2</div>
                <div className="stat">
                  <div className="cardPowerUsageData">
                    <div className="iconUse"><img src={AirCondition} alt="AirCondition" width="40%"></img></div>
                    <div className="dataUse">
                      <div>{parseInt(wattDay.filter(data => data.orderID === 4).map(data => data.wattperhoursperday) / 1000)} Kw</div>
                    </div>
                  </div>
                  <div className="cardPowerUsageData">
                    <div className="iconUse"><img src={LightBulb} alt="LightBulb" width="40%"></img></div>
                    <div className="dataUse">
                      <div>{parseInt(wattDay.filter(data => data.orderID === 5).map(data => data.wattperhoursperday) / 1000)} Kw</div>
                    </div>
                  </div>
                  <div className="cardPowerUsageData">
                    <div className="iconUse"><img src={PlugLine} alt="PlugLine" width="40%"></img></div>
                    <div className="dataUse">
                      <div >{parseInt(wattDay.filter(data => data.orderID === 6).map(data => data.wattperhoursperday) / 1000)} Kw</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
