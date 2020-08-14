
import Sawl from 'sweetalert2';
import {firebase, googleAuthProvider} from "../firebase/firebase-config";
import {types} from "../types/types";
import {startLoading, finishLoading} from "../actions/ui";
import {notesLogoutCleaning} from './notes';

export const startLoginEmailPassword = (email,password) => {
        return (dispatch) => {
            
           dispatch(startLoading());
          
           firebase.auth().signInWithEmailAndPassword(email, password).then(({user}) => {
               dispatch(login(user.uid, user.displayName));
               dispatch(finishLoading());
            }).catch(err => {
               
             dispatch(finishLoading());
             Sawl.fire('Error', err.message, 'error');   
           });


        }

}


export const starRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {
      
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) =>  {

            await user.updateProfile({displayName: name});

            dispatch(login(user.uid, user.displayName));

        }).catch(err => {
            Sawl.fire('Error', err.message, 'error');
        });

    }

}





export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then(({user}) => {
            dispatch(
                login(user.uid, user.displayName)
            )
        });
    }
}



export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
    
});


export const logout = () => ({
    type: types.logout,   
});

export const startLogout = () => {

    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(notesLogoutCleaning())
        dispatch(logout());
    }


}