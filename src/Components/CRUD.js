
//npm i bootstrap reactstrap axios sweetalert
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
function CRUD() {
    //direccion de la API
    const baseUrl="http://localhost:4008/vacuno/";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
      id: '',
      nombre: '',
      pfizer: '',
      moderna: '',
      administrado: '',
      vacunados:''

    });
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setFrameworkSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      console.log(frameworkSeleccionado);
    }
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const peticionGet=async()=>{
      
     
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
        //console.log(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }//peticionGet
  
    const peticionPost=async()=>{
      const usuario={
        nombre: frameworkSeleccionado.nombre,
        pfizer: frameworkSeleccionado.pfizer,
        moderna: frameworkSeleccionado.moderna,
        administrado: frameworkSeleccionado.administrado,
        vacunados: frameworkSeleccionado.vacunados
      };
      
      await axios.post(baseUrl, usuario)
      .then(response=>{
       
        //cerramos la ventana modal
        abrirCerrarModalInsertar();
        //refresco la tabla haciendo una peticion get
        peticionGet();
        
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPost
  
    const peticionPut=async()=>{
      
      
      const usuario={
        nombre: frameworkSeleccionado.nombre,
        pfizer: frameworkSeleccionado.pfizer,
        moderna: frameworkSeleccionado.moderna,
        administrado: frameworkSeleccionado.administrado,
        vacunados: frameworkSeleccionado.vacunados
      };
      await axios.put(baseUrl+"/"+frameworkSeleccionado.id,usuario)
      .then(response=>{
        if (response.data!=null)
        {
         //swal("Good job!", "You clicked the button!", "success"); 
          swal("Buen trabajo!","Registro Modificado Satisfactoriamente","success");
         
          abrirCerrarModalEditar();
           //refresco la tabla haciendo una peticion delete
           peticionGet();
        }  
       
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPut
  
    const peticionDelete=async()=>{
     
      axios.delete(baseUrl+"/"+frameworkSeleccionado.id).then(response=>{
      if (response.data!=null)
      {
        swal("Buen trabajo!","Registro Borrado Satisfactoriamente","success");
        abrirCerrarModalEliminar();
         //refresco la tabla haciendo una peticion delete
         peticionGet();
      }
      
       
      }).catch(error=>{
        console.log(error);
       
      })
    }//peticionDelete
  
    const seleccionarFramework=(framework, caso)=>{
      setFrameworkSeleccionado(framework);
  
      (caso==="Editar")?
      abrirCerrarModalEditar():
      abrirCerrarModalEliminar()
    }
  
    useEffect(()=>{
      peticionGet();
    },[])
  
    return (
      <div style={{textAlign: 'center'}}>
  <br />
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
        <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Pfizer</th>
            <th>Moderna</th>
            <th>Dosis Entregadas</th>
            <th>Administradas</th>
            <th>% Sobre Entregadas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {console.log(data[0])}
          {data.map(framework=>(
            <tr key={framework.id}>
              {/*console.log(framework.first_name)*/}
              {/* el nombre de los campos que vienen a continuacion tienes que ser
              los que nos devuelve el JSON. Fijate en como se llaman cuando te devuelve 
              haciendo una peticion get por la url http://localhost:4008/users/
              [{"id":1,"firstName":"juan","lastName":"Perez"},
              {"id":2,"firstName":"Ana","lastName":"Soria"},
              {"id":3,"firstName":"Luis","lastName":"Rodrigo"},
              {"id":4,"firstName":"Raquel","lastName":"Segovia"}]
              
  
              
              */}
              <td>{framework.id}</td>
              <td>{framework.nombre}</td>
              <td>{framework.pfizer}</td>
              <td>{framework.moderna}</td>
              <td>{framework.pfizer + framework.moderna}</td>
              <td>{framework.administrado}</td>
              <td>{(framework.administrado / (framework.pfizer + framework.moderna))*100}</td>
              
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>
              <span class="material-icons">cached</span>
            </button> 
            <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>
              Eliminar
            </button>
            </td>
            </tr>
          ))}
  
  
        </tbody> 
  
      </table>
  
  
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <br />
            <label>Pfizer: </label>
            <br />
            <input type="text" className="form-control" name="pfizer" onChange={handleChange}/>
            <br />
            <label>Moderna: </label>
            <br />
            <input type="text" className="form-control" name="moderna" onChange={handleChange}/>
            <br />
            <label>Administrado: </label>
            <br />
            <input type="text" className="form-control" name="administrado" onChange={handleChange}/>
            <br />
            <label>Vacunados: </label>
            <br />
            <input type="text" className="form-control" name="Vacunados" onChange={handleChange}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre}/>
            <br />
            <label>Pfizer: </label>
            <br />
            <input type="text" className="form-control" name="pfizer" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.pfizer}/>
            <br />
            <label>Moderna: </label>
            <br />
            <input type="text" className="form-control" name="moderna" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.moderna}/>
            <br />
            <label>Administradas: </label>
            <br />
            <input type="text" className="form-control" name="administrado" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.administrado}/>
            <br />
            <label>Vacunados: </label>
            <br />
            <input type="text" className="form-control" name="vacunados" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.vacunados}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEliminar}>
          <ModalBody>
          ¿Estás seguro que deseas eliminar al Usuario {frameworkSeleccionado && frameworkSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()} >
              No
            </button>
          </ModalFooter>
        </Modal>
  
      </div>
    );
  }
  
  export default CRUD;