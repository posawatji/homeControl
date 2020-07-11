// ไม่ได้ใช้แล้ว


import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from "axios";

const StatusApi = (data) => {

  // const [items, setItems] = useState([]);
  // const [Class, setClass] = useState(false);
  // const [isActive, setIsActive] = useState(null);

  const [product, setProduct] = useState([]);
  const url = `https://5e39272daad2220014962402.mockapi.io/api/test/status/`;

  const loadProduct = async () => {
    try {
      const response = await Axios.get(url, {

      });

      setProduct(response.data);
    } catch (error) {
      if (Axios.isCancel(error)) {
        console.log("Cancel axios data source on error");
      } else {
        throw error;
      }
    }
  };

  const updateStatus = (data) => {
    console.log(data)
    setProduct({
      id: product.id,
      floor: product.floor,
      status: !product.status
    })
    Axios.put(`https://5e39272daad2220014962402.mockapi.io/api/test/status?id=${data.id}`,product)
      .then(res => console.log(res.data));
  }

  useEffect(() => {
    loadProduct();
    // updateStatus(data)    
  }, [data]);
  return { product, setProduct }
}

export {StatusApi}


