import React, { useState } from 'react';

const Reset = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const procesarDatos = (e) => {
        e.preventDefault()
        if(!email.trim()){
            // console.log('Ingrese email');
            setError('Ingrese email')
            return
        }
        setError(null)
}



    return (
        <div className="mt-5">
        <h3 className="text-center">
            Reiniciar Constaseña
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
                   
                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                       Reiniciar Contraseña
                    </button>

                </form>
            </div>
        </div>
    </div>
    )
}

export default Reset;
