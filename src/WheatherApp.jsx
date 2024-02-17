import { useState } from "react"
import { CiSearch } from "react-icons/ci";
import Background from './imagenes/background.jpg'

export const WheatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '9bbe125a1dbb5fab8e17831db37bcb7d'
    
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error('Ocurrió el siguiente problema: ', error)
        }
    }


  return (
<>
    <img className="background" src={Background}/>
    <div className="container">
        <h1 className="title">Aplicación del Clima</h1>
        <form onSubmit={handleSubmit}>
            <input 
            className="input"
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            />
            <button className="btn" type="submit"><CiSearch/></button>
        </form>  
        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
        }
    </div>
</>
  )
}