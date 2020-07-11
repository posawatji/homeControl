import React,{useState,useEffect} from "react";
import "../components/css/control.css"
import axios from "axios";
import socketIOClient from "socket.io-client";



function Control() {
  const url = `http://watthomeapi.jp.ngrok.io/status`;
  const [product, setProduct] = useState([]);
  // const [input,setinput] = useState({
  //   order: 1,
  //   status: 1
  // })
  const updateStatus = (data) => {
    let status = data.status == 1 ? 0:1
    // console.log(status)
    const Product = {
      order: data.order,
      // floor: data.floor,
      // powerusage: data.powerusage,
      status: status
    }
    // console.log(Product.status)
    sent(Product)
    axios.put(url,
    {
      order: Product.order,
      status: Product.status
    })
    
      .then(res => {
        loadProduct()
      });
      // console.log(Product)
  }

  const sent = (data) => {
    const socket = socketIOClient("http://watthomewebserver.jp.ngrok.io/")
    socket.emit('sent-status',data)
  }

  const loadProduct = async () => {
    try {
      const response = await axios.get(url)
      // console.log(response)
      setProduct(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Cancel axios data source on error");
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    loadProduct();
    const interval = setInterval(() => {
      loadProduct();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const card = (data, num) => {
    // console.log(data)
    return (data.filter((data) => data.floor == num).map(Product => {
      return (
        <button key={Product.order} onClick={() => updateStatus(Product)}  className={Product.status == 1 ? "buttonControl1" : "buttonControl"}           >{Product.powerusage}</button>
        )
    })
    )
  }
  return (

      <div className="boxControl">

        <div className="box1">
          <div className="box1-tittle">Floor 1</div>
          <div className="box1-button">
            {card(product, "1")}
          </div>
        </div>
        <div className="box2">
          <div className="box2-tittle">Floor 2</div>
          <div className="box2-button">
            {card(product, "2")}
          </div>
        </div>
      </div>
  );
}

export default Control;
