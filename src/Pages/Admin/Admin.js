import React, { useEffect, useState } from 'react';
import Users from '../hooks/Users';
import TableR from './TableR';
import './Admin.css';

const Admin = () => {
        // Search List:
        const [searchList, setSearchList] = useState([]);
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
                                const pages = Math.ceil(count / 10);
                                setPageCount(pages);
                        })
        }, [user, searchList]);

        const [searchField, setSearchField] = useState('');
        const search = e => {
                const searchText = e.target.value;
                setSearchField(searchText)
                const matchResult = user?.filter(info => info.name.toLowerCase().includes(searchText.toLowerCase()) || info.email.toLowerCase().includes(searchText.toLowerCase()) || info.phone.includes(searchText))
                setSearchList(matchResult);
        }
        return (
                <div>

                        <div className="container mx-auto px-8 pt-4">
                                <div className="px-8 mx-auto pt-24">
                                        <div className="pl-12 flex justify-center align-items-center pt-24">
                                                <h4 className="text-white text-3xl fw-bold mr-4">Search Here</h4>
                                                <input onChange={search} type="text" placeholder="Search" className="input input-bordered " />
                                        </div>
                                </div>
                                <div className="overflow-x-auto mt-8">
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
                                                                searchField?.length ? searchList?.map(member => <TableR
                                                                        key={member._id}
                                                                        member={member}

                                                                >

                                                                </TableR>)
                                                                        :
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