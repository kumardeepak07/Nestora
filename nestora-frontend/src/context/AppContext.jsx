/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [properties, setProperties] = useState([]);

    const fetchUser = async ()=> {
        try {
            const { data } = await axios.get('/api/user/get-user')
            if(data.success){
                setUser(data.data);
                setIsOwner(data.data.role === 'owner')
            }else{
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchProperties = async () => {
        try {
            const { data } = await axios.get('/api/properties');
            if (data.success) {
            setProperties(data.data.content);
            console.log("Fetched properties:", data.data.content);  // ✅ pick content from data.data
            } else {
            toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        };

    const logout = ()=> {
        localStorage.removeItem('token')
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been looged out');
    }



    useEffect(()=> {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `${token}`
        setToken(token)
        fetchProperties()
    },[])

    useEffect(()=> {
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
            fetchProperties()
        }
    },[token])


    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser,
        showLogin, setShowLogin, logout, properties, setProperties, fetchProperties, checkInDate, 
        setCheckInDate, checkOutDate, setCheckOutDate
    }
    return (
    <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}