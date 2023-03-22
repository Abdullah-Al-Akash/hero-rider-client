import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Users = () => {
        const [members, setMembers] = useState([]);
        const navigate = useNavigate()
        useEffect(() => {
                fetch('http://localhost:5000/members', {
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
        return [members];
};

export default Users;