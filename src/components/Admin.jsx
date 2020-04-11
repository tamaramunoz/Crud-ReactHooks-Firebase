import React, { useEffect, useState, Fragment } from 'react';
import Crud from './Crud';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

const Admin = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (auth.currentUser) {
            console.log('existe un usuario');
            setUser(auth.currentUser)
        } else {
            console.log('no existe usuario');
            props.history.push('/login')
        }

    }, [props.history])

    return (
        <Fragment>
            <div>
                <h2 className="text-center mt-2">Ruta protegida</h2>
                {
                    user && (
                        <Crud user={user} />
                    )
                }
            </div>
        </Fragment>
    )
}

export default withRouter(Admin)
