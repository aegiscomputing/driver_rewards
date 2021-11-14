import React, { Component, useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


function TableData(props) {

    const [driversData, setDriversData] = useState([])
    

    useEffect(() => {
        async function fetchDrivers() {
            const drivers_response = await axios.post("http://localhost:3001/get_drivers", {
                organizationID1: localStorage.getItem('orgid'),
                organizationID2: localStorage.getItem('orgid'),
                organizationID3: localStorage.getItem('orgid')
            })
            setDriversData(drivers_response.data);
            //console.log(drivers_response.data)
        }
        fetchDrivers();
    }, [props.dataStatus]);

    //console.log(driversData);
    return (<tbody>{driversData.map((driver) => {
        const id = driver.Driver_ID;
        const first = driver.Driver_First_Name;
        const last = driver.Driver_Last_Name;
        const email = driver.Driver_Email
        let points = 0;
        let org = 0;
        if (driver.Organization_ID1 == localStorage.getItem('orgid')) { org = 1; points = driver.Driver_Points1; }
        else if (driver.Organization_ID2 == localStorage.getItem('orgid')) { org = 2; points = driver.Driver_Points2; }
        else if (driver.Organization_ID3 == localStorage.getItem('orgid')) { org = 3; points = driver.Driver_Points3; }
        //const { Driver_ID, Driver_First_Name, Driver_Last_Name, Driver_Email, Driver_Points1 } = driver
        //console.log(id);
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{first} {last}</td>
                <td>{email}</td>
                <td>{points}</td>
                <td><Button onClick={() => { props.setAddModal(true); props.setDriver(id); props.setOrg(org) }}>+</Button> <Button onClick={() => { props.setSubModal(true); props.setDriver(id); props.setOrg(org) }}>-</Button></td>
            </tr>
        )
    })}</tbody>)
}

export default TableData;