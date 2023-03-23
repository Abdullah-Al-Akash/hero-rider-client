import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import handleActive from './Active';

const Users = () => {
        const [members, setMembers] = useState([]);
        // Handle Active:
        const active = handleActive;
        const navigate = useNavigate()
        useEffect(() => {
                fetch('https://hero-rider-server-nine.vercel.app/members', {
                        method: 'GET'
                })
                        .then(res => {
                                // if (res.status === 401 || res.status === 403) {
                                //         navigate('/');
                                // }
                                return res.json()
                        })
                        .then(data => {
                                setMembers(data)
                        })
        }, [])
        return [members, active];
};

export default Users;