import React, { Fragment, useState, useCallback } from 'react';
import { auth, db } from '../firebase';
import { withRouter } from 'react-router-dom';


const Login = (props) => {
    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(false);

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            // console.log('Ingrese email');
            setError('Ingrese email')
            return
        }
        if(!pass.trim()){
            // console.log('Ingrese password');
            setError('Ingrese password')
            return
        }
        if(pass.length < 6){
            // console.log('Ingresa password mayor a 6 carácteres');
            setError('Ingresa password mayor a 6 carácteres')
            return
        }

        setError(null)
        console.log('Pasando todas las validaciones')

        if(esRegistro){
            registrar()
        }else{
            login()
        }
}

    const login = useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user);
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Ingresa un email válido')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Email no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
        }
    }, [email, pass, props.history])

    const registrar = useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user);
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid).add({
                name: 'tarea de ejemplo',
                fecha: Date.now()
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Este email ya está registrado')
            }
        }
    }, [email, pass, props.history])


    return (
        <Fragment>
            <div className="mt-5">
                <h3 className="text-center">
                    {
                        esRegistro ? 'Registrate' : 'Inicia Sesión'
                    }
                </h3>
                <hr/>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <form onSubmit={procesarDatos}>
                            {
                                error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )
                            }
                            <input 
                                type="mail"
                                className="form-control mb-2"
                                placeholder="Ingrese email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            <input 
                                type="password"
                                className="form-control mb-2"
                                placeholder="Ingrese password"
                                onChange={e => setPass(e.target.value)}
                                value={pass}
                            />
                            <button className="btn btn-dark btn-lg btn-block" type="submit">
                                {
                                    esRegistro ? 'Registrarse' : 'Iniciar sesión'
                                }
                            </button>
                            <button 
                                className="btn btn-info btn-sm btn-block"
                                onClick={() => setEsRegistro(!esRegistro)}
                                type="button"
                            >
                                {
                                    esRegistro ? '¿Ya tienes cuenta?' : '¿No estas registrado?'
                                }
                            </button>
                            {
                                !esRegistro ? (
                            <button 
                                className="btn btn-lg btn-danger btn-sm mt-2" 
                                type="button"
                                onClick={() => props.history.push('/reset')}
                            >
                                Recuperar contraseña
                            </button>
                                ) : null
                            }

                        </form>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default withRouter(Login);
