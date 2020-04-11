import React, { Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }


    return (
        <Fragment>
            <div className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Crud React Hooks + Firebase</Link>
                <div>
                    <div className="d-flex">
                        <NavLink className="btn btn-dark mr-2" to="/" exact>
                            Inicio
                        </NavLink>
                        {
                            props.firebaseUser !== null ? (
                                <NavLink className="btn btn-dark mr-2" to="/admin">
                                    Admin
                                </NavLink>

                            ) : null
                        }
                        {
                            props.firebaseUser !== null ? (
                                <button
                                    className="btn btn-dark"
                                    onClick={() => cerrarSesion()}
                                >Cerrar Sesión</button>
                            ) : (
                                    <NavLink className="btn btn-dark mr-2" to="/login">
                                        Login
                                    </NavLink>
                                )
                        }
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default withRouter(Navbar)
