import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from "axios";



export const DayHis = () => {

    const [dayUse, setDayUse] = useState([]);
    const url = `https://5e39272daad2220014962402.mockapi.io/api/test/lineDayHisF1/`;

    const dayUseApi = async () => {
        try {
            const response = await Axios.get(url.JSON(), {

            });
            setDayUse(response.data);
        } catch (error) {
            if (Axios.isCancel(error)) {
                console.log("Cancel axios data source on error");
            } else {
                throw error;
            }

        }
    };

    const apiDayUse = dayUse.map((dayUses) => {
        console.log(dayUses.status)
    }
    )
    


    useEffect(() => {
        dayUseApi();

    }, []);
    return { dayUse, dayUseApi }

}


