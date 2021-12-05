import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import { AutoComplete } from 'primereact/autocomplete';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

export default function GetWeather(props) {
    // const countries = 'first';
    // const [countriyKey, setCountriyKey] = useState([]);
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [temperatureMax, setTemperatureMax] = useState();
    const [temperatureMin, setTemperatureMin] = useState();



    var arr = [];
    var name;
    let obj = {};
    function set(temperature) {
        setTemperatureMax(temperature.Maximum.Value)
        setTemperatureMin(temperature.Minimum.Value)


    }
    function searchCountry() {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=LKC1IOe2oaiZtAuXx5U1s21N3u6n4AJU&q=${selectedCountry1}&language=en`)
            .then(response => response.json())
            // .then(response => console.log(response.LocalizedName))  
            .then(res => {
                console.log(res)
                arr = [];
                res.map((item) => {
                    name = item.LocalizedName
                    console.log(" item.LocalizedName", item.LocalizedName)
                    obj[name] = item.Key;


                    // setCountriyKey(x=>[...x,obj])
                    arr.push(item.LocalizedName)
                    setFilteredCountries(filteredCountries => [...filteredCountries, item.LocalizedName]);

                })

            }).then(x => {
                console.log(obj)
                window.cityObjectKeys = obj;

            })

    }

    // console.log("countriyKey"+JSON.stringify(countriyKey)  )



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    function weather() {
        let myKey;
        myKey = window.cityObjectKeys[selectedCountry1]
        console.log(myKey);

        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${myKey}?apikey=LKC1IOe2oaiZtAuXx5U1s21N3u6n4AJU&language=en`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                set(response.DailyForecasts[0].Temperature)
                //    console.log(temperature);
                //     console.log(temperature);


            })
            .catch(error => console.log('error', error));

    }

    return (


        <>
        <h1>Welcome to your weather app</h1><br></br>

        <h4>Select the desired area</h4>

            <AutoComplete value={selectedCountry1} suggestions={filteredCountries} completeMethod={searchCountry} required="true" field="name" onChange={(e) => {
                setSelectedCountry1(e.value)
            }} />
            <button onClick={weather}>search</button>
            <br></br>
                <>
                    {temperatureMax !== undefined ?

                    <div> the weather is max{temperatureMax} and min {temperatureMin} in Fahrenheit</div>
                    :<></> 
                    }
                </>
           


        </>





    )
}
// לעשות וינפוט באונ צאנג לשלוח לאפי עם התוכן ולהציג את מה שחוזר
// לקחת את הKEY מתוך האוביקט שבחר לשלוח ל

// "http://dataservice.accuweather.com/forecasts/v1/daily/1day/101924?apikey=LKC1IOe2oaiZtAuXx5U1s21N3u6n4AJU&language=en"
