import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../registrouser.css'

function RegistroAdmin(){
    const [correo, setcorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const GoTo = useNavigate();

    const handleClickSubmit = async (e) => {
        e.preventDefault("datos");
        //console.log('Form submitted:', { nombre, fechaN, correo, password, celular, cedula, ciudad });

        try {
            const response = await fetch('https://gana-loco-anderb.vercel.app/apiv1/new_admin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({correo, password})
            });

            //validación del resultado que nos trae el backend
            const result = await response.json();
            if(result){ 
                window.alert(result.status);
                GoTo("/");
            }else{}
            
        } catch (error) {
            console.error('Error:', error);
            setError('Internal server error');
        }
    }


    return (

        <>  
        <header>

            <div class="container-fluid px-1 py-5 mx-auto">
                <div class="row d-flex justify-content-center">
                    <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <h3>Regitro de usuario Administrador</h3>
                        <p class="blue-text">por favor ingresa correo y clave.</p>
                        <div class="card">
                            <h5 class="text-center mb-4">Ingresa los datos</h5>
                            <form class="form-card" onSubmit={handleClickSubmit}>

                                <div class="row justify-content-between text-left">
                                    <dir class="col-sm-2"></dir>
                                    <div class="form-group col-sm-8 flex-column d-flex"> 
                                        <label class="form-control-label px-3" htmlFor="email">Usuario<span class="text-danger"> *</span></label> 
                                        <input type="email" id="email" name="email" placeholder="example@example.com" onChange={(e) => setcorreo(e.target.value)} required minLength="5" /> </div>
                                    <dir class="col-sm-2"></dir>
                                </div>
                                <div class="row justify-content-between text-left mt-4">
                                    <dir class="col-sm-2"></dir>
                                    <div class="form-group col-sm-8 flex-column d-flex"> 
                                        <label class="form-control-label px-3" htmlFor="pass">Clave<span class="text-danger"> *</span></label> 
                                        <input type="password" id="pass" name="pass" placeholder="***********" onChange={(e) => setPassword(e.target.value)} required /> </div>
                                    <dir class="col-sm-2"></dir>
                                </div>

                                <div class="row justify-content-between text-left mt-3">
                                    <dir class="col-sm-2"></dir>
                                    <div class="form-group col-sm-8"> <button type="submit" class="btn btn-primary">Registrarse</button> </div>
                                    <dir class="col-sm-2"></dir>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>   

        </header>            
        </>
    )
}

export default RegistroAdmin