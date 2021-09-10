import React,{useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from "../App";

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const logoutPage = async() =>{
        try{
            const res = await fetch('/logout',{
                method: 'GET',
                headers: {
                    Accept: 'appllication/json',
                    'Content-Type': 'application/json'
                },
                credentials:'include'
            });
            
            dispatch({type:'USER', payload:false});
            history.push('/login', { replace: true });

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
            
        }

    } 

    useEffect(()=>{
        logoutPage();
    }, []);


    return (
        <>
            <h1>logout page</h1>  
        </>
    )
}

export default Logout
