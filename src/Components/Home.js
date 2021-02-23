import React from 'react';
//para trabajar con imagenes
//primero la tengo que importar de dnde esta
import imagenes from'../assets/imagenes'
const inicio = () => {
    return(
        <div className="App">
            <br/>
            <img src={imagenes.img3} alt="img usuarios" width="800" height="400"></img>
        </div>
    )
}

export default inicio;