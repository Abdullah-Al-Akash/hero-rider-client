import React, { useEffect, useState } from 'react';
import Users from '../hooks/Users';
import TableR from './TableR';

const Admin = () => {
        const [members, setMembers] = useState([])
        useEffect(() => {
                fetch('http://localhost:5000/members')
                        .then(res => res.json())
                        .then(data => {
                                setMembers(data);
                        })
        }, [members])
        return (
                <div>
                        <div className="container mx-auto px-8 pt-4">
                                <div className="overflow-x-auto">
                                        <table className="table w-full">
                                                <thead>
                                                        <tr>
                                                                <th className="text-lg text-green-500">ID</th>
                                                                <th className="text-lg  text-green-500">Full Name</th>
                                                                <th className="text-lg text-green-500">Email</th>
                                                                <th className="text-lg  text-green-500">Phone</th>
                                                                <th className="text-lg text-green-500">Profile Type</th>
                                                                <th className="text-lg text-green-500">Vehicle Type</th>
                                                                <th className="text-lg text-green-500">Status</th>

                                                                <th className="text-lg text-green-500 ps-4">Action</th>
                                                        </tr>
                                                </thead>

                                                <tbody>
                                                        {
                                                                members?.map(member => <TableR
                                                                        key={member._id}
                                                                        member={member}

                                                                >

                                                                </TableR>)
                                                        }
                                                </tbody>
                                        </table>

                                </div>
                        </div>
                </div>
        );
};

export default Admin;