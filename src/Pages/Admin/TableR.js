import React from 'react';
import { toast } from 'react-toastify';
import handleActive from '../hooks/Active';
import handleBlock from '../hooks/Block';

const TableR = ({ member }) => {
        const { name, email, phone, profileType, _id, vehicle, status, } = member;

        // Handle Active:
        const active = handleActive;
        const block = handleBlock;
        return (
                <tr className='text-white'>
                        <td>{_id ? _id : 'loading'}</td>
                        <td className="">{name}</td>
                        <td className="">{email}</td>
                        <td className="">{phone}</td>
                        <td className="">{profileType}</td>
                        <td className="">{vehicle}</td>
                        <td className="">{
                                status === 'pending' ?
                                        <span className="bg-yellow-200 rounded px-2 pb-1 pt-1 text-dark">Pending</span>
                                        : status === 'active' ?
                                                <span className="bg-green-300 rounded px-2 pb-1 pt-1 text-dark">Active</span> :
                                                <span className="bg-red-500 text-white rounded px-2 pb-1 pt-1 text-dark">Blocked</span>
                        }</td>
                        <td className="">

                                {
                                        status === 'block' ?
                                                <span className="rounded px-2 pb-1 pt-1 text-white fw-bold">Already Blocked</span>
                                                :
                                                status === 'pending' ?
                                                        <>
                                                                <span onClick={() => active(_id, member)} className="bg-green-400 rounded px-2 pb-1 pt-1 text-dark fw-bold cursor-pointer">Active</span>
                                                                <span onClick={() => block(_id, member)} className="bg-yellow-400 rounded px-2 pb-1 pt-1 text-dark fw-bold cursor-pointer ms-2">Block</span>
                                                        </>
                                                        :
                                                        <span onClick={() => block(_id, member)} className="bg-yellow-400 rounded px-2 pb-1 pt-1 text-dark fw-bold cursor-pointer">Block</span>
                                }
                        </td>

                </tr>
        );
};

export default TableR;