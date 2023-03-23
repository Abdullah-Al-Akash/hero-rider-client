import React, { useEffect, useState } from 'react';
import Users from '../hooks/Users';
import TableR from './TableR';
import './Admin.css';

const Admin = () => {
        const [members] = Users()
        const [user, setUser] = useState([])
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
        const [size, setSize] = useState(10);
        useEffect(() => {
                fetch(`https://hero-rider-server-nine.vercel.app/members?page=${currentPage}&size=${size}`)
                        .then(res => res.json())
                        .then(data => {
                                setUser(data);
                                const count = members.length;
                                console.log(count);
                                const pages = Math.ceil(count / 10);
                                setPageCount(pages);
                        })
        }, [user]);
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
                                                                user?.map(member => <TableR
                                                                        key={member._id}
                                                                        member={member}

                                                                >

                                                                </TableR>)
                                                        }
                                                </tbody>
                                        </table>

                                </div>
                        </div>
                        <div className="text-center mt-12 mb-12">
                                {
                                        [...Array(pageCount).keys()].map(number => <button
                                                key={number}
                                                onClick={() => setCurrentPage(number)}
                                                className={`btn fw-bold ms-2 ${currentPage === number ? 'selected' : 'bg-white text-dark'}`}
                                        >
                                                {number + 1}
                                        </button>)
                                }
                        </div>
                </div>
        );
};

export default Admin;