import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Users from '../hooks/Users';
import './Profile.css'

const Profile = () => {

        const navigate = useNavigate();
        const [members] = Users();
        console.log(members);
        const currentUser = localStorage.getItem('user');

        // Side Effect for update user:
        const [cUser, setCUser] = useState({});
        useEffect(() => {
                const user = members?.find(u => u.email === currentUser);
                setCUser(user)
        }, [members, currentUser]);
        console.log(cUser);
        const { name, email, _id, image, phone, carName, carModel, palateNumber, profileType, vehicle, age } = cUser ? cUser : '';
        return (
                <div className="pt-12 pb-8 profile-bg">
                        <div>
                                <div className="flex justify-center w-96 mx-auto">
                                        <marquee behavior="" direction="">
                                                <h3 className="text-5xl font-bold mr-4 text-yellow-400"><span className="text-white">Welcome back</span> {name}!</h3>
                                        </marquee>
                                </div>
                        </div>
                        <div className='w-76 mx-96 mt-12'>
                                <div className='row'>
                                        <div className="mx-2 col-md-3">
                                                <div className="avatar online">
                                                        <div className="w-24 rounded-full">
                                                                <img src={image} />
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="col-md-3 mx-10 mt-6">
                                                <h3 className="fw-bold text-2xl text-yellow-500">{name}</h3>
                                        </div>
                                </div>
                        </div>
                        <div className='w-76 mx-96 mt-6'>
                                <div className='row'>
                                        <div className="col-md-3 mx-4">

                                                <h3 className="fw-bold text-xl text-yellow-400">Email:</h3>

                                        </div>
                                        <div className="col-md-4 mx-2">
                                                <h3 className="fw-bold text-xl text-white">{email}</h3>
                                        </div>
                                </div>
                        </div>
                        <div className='w-76 mx-96 mt-6'>
                                <div className='row'>
                                        <div className="col-md-3 mx-4">

                                                <h3 className="fw-bold text-xl text-yellow-400">Mobile:</h3>

                                        </div>
                                        <div className="col-md-4 mx-2">
                                                <h3 className="fw-bold text-xl text-white">{phone}</h3>
                                        </div>
                                </div>
                        </div>
                        <div className='w-76 mx-96 mt-6'>
                                <div className='row'>
                                        <div className="col-md-3 mx-4">

                                                <h3 className="fw-bold text-xl text-yellow-400">Age:</h3>

                                        </div>
                                        <div className="col-md-4 mx-3">
                                                <h3 className="fw-bold text-xl text-white">{age}</h3>
                                        </div>
                                </div>
                        </div>
                        <div className='w-76 mx-96 mt-6'>
                                <div className="row">
                                        <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Profile Type:</h3></div>
                                        <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-green-200 pt-1 pb-1 rounded-full">{profileType}</h3></div>
                                </div>
                        </div>
                        <div className='w-76 mx-96 mt-6'>
                                <div className="row">
                                        <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Vehicle Type:</h3></div>
                                        <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-green-200 pt-1 pb-1 rounded-full">{vehicle}</h3></div>
                                </div>
                        </div>
                        {
                                profileType === 'rider' ?
                                        <div className='card shadow-lg bg-gray-700 p-8 w-76 mx-96 mt-6 pb-8'>
                                                <h3 className='fw-bold text-2xl mx-6 text-center pb-4 underline  underline-offset-auto text-white'>Car Information</h3>
                                                <div className="row mt-4">
                                                        <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Car Name:</h3></div>
                                                        <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-green-200 pt-1 pb-1 rounded-full">{carName}</h3></div>
                                                </div>
                                                <div className="row mt-4">
                                                        <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Car Model:</h3></div>
                                                        <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-green-200 pt-1 pb-1 rounded-full">{carModel}</h3></div>
                                                </div>
                                                <div className="row mt-4">
                                                        <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Palate Number:</h3></div>
                                                        <div className="col-md-3 text-center"><h3 className="fw-bold text-xl bg-green-200 pt-1 pb-1 rounded-full">{palateNumber}</h3></div>
                                                </div>
                                        </div>
                                        :
                                        ''
                        }
                </div>
        );
};

export default Profile;