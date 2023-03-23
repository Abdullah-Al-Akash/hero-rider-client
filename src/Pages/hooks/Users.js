import React, { useEffect, useState } from 'react';


const Users = () => {
        const [members, setMembers] = useState([]);
        // Handle Active:

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
        return [members];
};

export default Users;