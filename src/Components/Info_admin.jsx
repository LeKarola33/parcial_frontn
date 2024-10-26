import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css'


function InfoAdmin(){


    const USUARIO = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage    
    if(USUARIO){
   
        const [DatosTabla1, setDatosTabla1] = useState([]);
        //const [DatosTabla2, setDatosTabla2] = useState([]);
        //const [DatosTabla3, setDatosTabla3] = useState([]);
        //const [DatosTabla4, setDatosTabla4] = useState([]); 
        const [DatosUser, setDatosUser] = useState([]);
        const [AuditLogin, setAuditLogin] = useState([]); 

        const handleLogout = () => {
            localStorage.clear();
            window.location = 'https://parcial-frontn.vercel.app'
        };

        useEffect(() => {

            const CargarTablas = async () => {
            try {
                //const iduser = localStorage.getItem("id"); //obtengo el (ID) del usuario autenticado  del local storage
                const response1 = await axios.post('https://parcialbakend.vercel.app/apiv1/info_admin_tabla1');
                setDatosTabla1(response1.data);

                //const response2 = await axios.post('https://parcialbakend.vercel.app/apiv1/info_admin_tabla2');
                //setDatosTabla2(response2.data);

                //const response3 = await axios.post('https://parcialbakend.vercel.app/apiv1/info_admin_tabla3');
                //setDatosTabla3(response3.data);

                //const response4 = await axios.post('https://parcialbakend.vercel/app/apiv1/info_admin_tabla4');
                //setDatosTabla4(response4.data);

            } catch (error) {
                console.error(error);
            }
            };
            
            const CargarInfoUser = async () => {
                try {
                    const user = localStorage.getItem("user"); //obtengo el (usuario) del usuario autenticado  del local storage
                    const response2 = await axios.post('https://parcialbakend.vercel.app/apiv1/info_user', {user});
                    setDatosUser(response2.data);
                } catch (error) {
                console.error(error);
                }
            };

            const CargarAccessLogin = async () => {
                try {
                    const user = localStorage.getItem("user"); //obtengo el (usuario) del usuario autenticado  del local storage
                    const response3 = await axios.post('https://parcialbakend.vercel.app/apiv1/info_audit_users', {user});
                    setAuditLogin(response3.data);
                } catch (error) {
                console.error(error);
                }
            };

            CargarTablas();
            CargarInfoUser();
            CargarAccessLogin();
        }, []);


        return (

            <>
            <header>
                <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top border text-white border bg-transparent">
                    <div class="container-fluid">
                        
                        <ul class="navbar-nav ms-auto d-flex flex-row">
                            <div className='pt-2 d-none d-md-flex input-group w-auto my-auto'>
                                {DatosUser.map((datauser) => ( <span className='m-2'> Usuario: <h5 class="mb-0 text-center"> {datauser.user}  </h5> </span> )) } 
                            </div>

                            <li class="nav-item">
                                <a class="nav-link me-3 me-lg-0" href="#">
                                    <i class="fas fa-fill-drip"></i>
                                </a>
                            </li>
                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                            <li class="nav-item ">
                                <button className='btn btn-warning' onClick={handleLogout} > 
                                    <span>Adios</span>
                                </button>
                            </li>

                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
            

                <main>
                    <div class="container pt-4">

                    <div className='card-body '>
                    <br />
                    </div>
                        <section class="mb-4">

                            {/* tabla ganadores */}
                            <div class="card mt-5 text-white border bg-transparent ">
                                <div class="card-header text-center py-3">
                                    <h5 class="mb-0 text-center">
                                        <strong>Usuarios ganadoresn</strong>
                                    </h5>
                                </div>
                                <div class="card-body bg-white text-dark ">
                                    <div class="table-responsive">
                                        <table class="table table-hover text-nowrap ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">NOMBRE GANADOR</th>
                                                    <th scope="col">CÉDULA</th>
                                                    <th scope="col">TELÉFONO</th>
                                                    <th scope="col">CÓDIGO</th>
                                                    <th scope="col">PREMIO $</th>
                                                    <th scope="col">FECHA REGISTRO</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                DatosTabla1.map((datospremios) => (
                                                <tr key={datospremios._id}>
                                                    <td>{datospremios.nombre}</td>
                                                    <td>{datospremios.cedula}</td>
                                                    <td>{datospremios.telefono}</td>
                                                    <td> <img src="https://img.icons8.com/?size=100&id=P6jWGmVbl2Mb&format=png&color=000000" height="20" alt="" loading="lazy" /> {datospremios.codigo}</td>
                                                    <td>{datospremios.premio}</td>
                                                    <td>{datospremios.fecha}</td>
                                                </tr>
                                                )) 
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                        </section>

                    </div>
                </main>
            </>
        )

    }else{
        //Se redirecciona al login si no existe una varia de usuario valida 
        window.location= 'https://parcial-frontn.vercel.app' // ruta de ront
    }
}

export default InfoAdmin