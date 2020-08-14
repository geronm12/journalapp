import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import {useDispatch, useSelector} from 'react-redux';

import {setError, removeError} from '../../actions/ui';
import {useForm} from '../../hooks/useForm';
import { starRegisterWithEmailPasswordName } from '../../actions/auth';
 

export const RegisterScreen = () => {

    const [values, handleInputChange, reset] = useForm(initialValues());

    const { name, email, password, password2 } = values;

    const dispatch = useDispatch();
     
    const state = useSelector(state => state);

    const {ui} = state;

    const onRegister = (e) => {
        e.preventDefault();
        
        if(isFormValid()){
           dispatch( starRegisterWithEmailPasswordName(email, password, name) );
        }

    }


    const isFormValid = () => {

        if(name.trim().length === 0){
          const error = dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail( email )){
            dispatch(setError('Should be an Email'));
            return false;
        }else if(password !== password2 || password.length < 5){
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());

        return true;
    }



    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={onRegister} className="animate__animated animate__fadeIn animate__faster">
               { ui.msgError && (<div className="auth__alert-error">
                  {ui.msgError}
                </div>)}

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}


function initialValues(){
    return {
        name: '',
        email: '',
        password: '',
        password2: ''
    }
}