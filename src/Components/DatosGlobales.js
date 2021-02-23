//import React from 'react';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


const Pricing = () => {
    //direccion de la API
    const baseUrl="http://localhost:4008/vacuno/";
    const [data, setData]=useState([]);


   useEffect(() => {
        console.log('object')
        peticionGet();
    },[]);


 /*
       const obtenerDatos = async () => {
        const cantidades = await fetch(baseUrl)
        const vacunos = await cantidades.json()
        //console.log(vacunos)
        //setData(vacunos);
      setData(vacunos);
      console.log(data);
    }
 */

 const peticionGet = async()=>{
     await axios.get(baseUrl)
     .then(Response=>{
        setData(Response.data);
        console.log(Response.data);
     }).catch(error=>{
     console.log(error);
 })
 }
    return(
        <div className="App">
            <h1>Datos Globales</h1>
            {console.log(typeof data)}
            
      
     <div className="resultados">
     <div className="bloque1">
     <div className="color1">
     <label><u>Nª de personas Con pautas Completa</u></label><br/>
       {data.reduce((x, y)=>x + y.pfizer,0)}
       </div><br></br>
       <div className="color2">
       <label><u>Dosis Administrada</u></label>
       {data.reduce((x, y)=>x + y.moderna,0)}
       </div><br></br>
       <div className="color3">
           <label><u>Dosis Entregada</u></label><br/>
       {data.reduce((x, y)=>(x + y.moderna  + y.pfizer),0)} 
       </div>
     </div><br></br>
     </div><br/><br/>
     <hr/>
     <div className="bloque2">
     <div className="color">
       <label><u>Dosis Administrada</u></label>
       {data.reduce((x, y)=>x + y.moderna,0)}
       </div><br></br>
     </div>
     


        </div>
    )

}

export default Pricing;