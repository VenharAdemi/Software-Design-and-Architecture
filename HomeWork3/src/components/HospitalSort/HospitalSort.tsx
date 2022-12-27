import React, {useState, useMemo, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import Papa from "papaparse";
import Pagination from "../../Pagination"
import useLocation from "../../useLocation";
import { hasOnlyExpressionInitializer } from "typescript";

let PageSize = 10;


async function GetData() {
    const data = Papa.parse(await fetchCsv(), { header: true });
    data.data.map((item: any, index: any) => {
        hospitals.push({
            id: index,
            latitude: item["latitude"],
            longitude: item["longitude"],
            name: item["name"],
            operator: item["operator"],
            city: item["addr:city"],
            street: item["addr:street"],
            phone: item["phone"],
            website: item["website"],
            distance: 0
        })
    })
    hospitals = hospitals.slice(1);
    return data.data;
}

async function fetchCsv() {
    const response = await fetch("data/hospital-data.csv");
    if (response.body === null) throw new Error("response body is null");
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    return csv;
}
function calculateDistance(lattitude1: number, longittude1: number,lattitude2: number, longittude2: number)
{
    
const toRadian = (n: number) => (n * Math.PI) / 180

    let lat2 = lattitude2
    let lon2 = longittude2
    let lat1 = lattitude1
    let lon1 = longittude1
    let R = 6371  // km
    let x1 = lat2 - lat1
    let dLat = toRadian(x1)
    let x2 = lon2 - lon1
    let dLon = toRadian(x2)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c
    return d 
  }

let hospitals = [{
    id: 1,
    latitude: 1,
    longitude: 1,
    name: "name",
    operator: "s",
    city: "s",
    street: "s",
    phone: "s",
    website: "s",
    distance: 0
  },
  ]

  GetData();

function HospitalSort(){
    const location = useLocation();
    const navigate = useNavigate();
    let sortedHospitals = [{
        id: 1,
        latitude: 1,
        longitude: 1,
        name: 's',
        operator: "s",
        city: "s",
        street: "s",
        phone: "s",
        website: "s",
        distance: 0
    }]

    hospitals.forEach(function(hospital){
        sortedHospitals.push({
            id: hospital.id,
            latitude: hospital.latitude,
            longitude: hospital.longitude,
            name: hospital.name,
            operator: hospital.operator,
            city: hospital.city,
            street: hospital.street,
            phone: hospital.phone,
            website: hospital.website,
            distance: calculateDistance(hospital.latitude, hospital.longitude, +location.coordinates.lat, +location.coordinates.lng)
        })
    })

    sortedHospitals = sortedHospitals.slice(1);
    sortedHospitals.sort(function(a, b) {
        return a.distance - b.distance;
      });
    sortedHospitals = sortedHospitals.filter(hospital => hospital.name != "")
    console.log()
    const [currentPage, setCurrentPage] = useState(1);

    const goToHomePage = () =>{
        navigate("/");
    };

    const goToHospitalList = () =>{
        navigate("/list");
    }

    const CurrentTableData = useMemo (() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sortedHospitals.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
        <table>
    <thead>
      <tr>
        <th>NAME</th>
        <th>ADDRESS</th>
        <th>PHONE</th>
        <th>WEBSITE</th>
      </tr>
    </thead>
    <tbody>
      {CurrentTableData.map(hospital => {
        return (
          <tr>
            <td>{hospital.name}</td>
            <td>{hospital.street} - {hospital.city}</td>
            <td>{hospital.phone}</td>
            <td>{hospital.website}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <Pagination
  className="pagination-bar"
  currentPage={currentPage}
  totalCount={hospitals.length}
  pageSize={PageSize}
  onPageChange={(currentPage: React.SetStateAction<number>) => setCurrentPage(currentPage)}
/>
<Button variant="contained" style={{ width: "200px" }} onClick={goToHomePage}>
          Home
</Button>
<Button variant="contained" style={{ width: "200px", marginLeft: "10px"}} onClick={goToHospitalList}>
          HOSPITAL LIST
</Button>
        </>
    )

}
export default React.memo(HospitalSort);