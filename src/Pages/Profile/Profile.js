import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from '../Admin/Admin';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import Users from '../hooks/Users';
import './Profile.css'
const stripePromise = loadStripe('pk_test_51If57xGFVg3TaXfKaayGBVRcIahQUEqnWSiSfjrzIj5Qa7yyvTsRHfRQjVh7oZea2PbVVU2uT7ox3Jn76aXxFWVA00Sac7CiDN');
const Profile = () => {
        const [pageCount, setPageCount] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
        const [size, setSize] = useState(10);

        const navigate = useNavigate();
        const [members, setMembers] = useState([])
        useEffect(() => {
                fetch(`https://hero-rider-server-nine.vercel.app/members`, {
                        method: 'GET'
                })
                        .then(res => {
                                return res.json()
                        })
                        .then(data => {
                                setMembers(data)
                        })
        }, [members])

        const currentUser = localStorage.getItem('user');

        // Side Effect for update user:
        const [cUser, setCUser] = useState({});
        useEffect(() => {
                const user = members?.find(u => u.email === currentUser);
                setCUser(user)
        }, [members, currentUser]);
        const { name, email, _id, image, phone, carName, carModel, palateNumber, profileType, vehicle, age, status, role } = cUser ? cUser : '';

        // Log Out Function:
        const logout = () => {
                localStorage.clear();
                navigate('/');
        }
        return (
                <div className="pt-12 pb-8 profile-bg">

                        {/* Log Out Option */}
                        <div className='text-end mr-96'>
                                <button onClick={logout} className='btn btn-warning fw-bold'>Log Out</button>
                        </div>
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
                                        <div className="col-md-4 mx-10 mt-6">
                                                <h3 className="fw-bold text-2xl text-yellow-500">{name}</h3>
                                                <h3 className="fw-bold text-sm text-white mt-2">Status: {status === 'pending' ? <span className="font-thin px-2 pt-1 pb-2 bg-yellow-200 rounded-full text-dark fw-bold">Pending 🙂</span> : status === 'active' ?
                                                        <span className="font-thin px-2 pt-1 pb-2 bg-green-400 rounded-full text-dark fw-bold">Active 🤗</span>
                                                        :
                                                        <span className="font-thin px-2 pt-1 pb-2 bg-red-500 rounded-full text-white fw-bold">Blocked 😭</span>}</h3>


                                        </div>
                                </div>
                        </div>
                        {
                                role === 'member' ?
                                        <div>
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

                                                                        <h3 className="fw-bold text-xl text-yellow-400">ID:</h3>

                                                                </div>
                                                                <div className="col-md-4 mx-2">
                                                                        <h3 className="fw-bold text-xl text-white">{_id}</h3>
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
                                                                <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-yellow-200 pt-1 pb-1 rounded-full">{profileType}</h3></div>
                                                        </div>
                                                </div>
                                                <div className='w-76 mx-96 mt-6'>
                                                        <div className="row">
                                                                <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Vehicle Type:</h3></div>
                                                                <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-yellow-200 pt-1 pb-1 rounded-full">{vehicle}</h3></div>
                                                        </div>
                                                </div>
                                                {
                                                        profileType === 'rider' ?
                                                                <div className='card shadow-lg bg-gray-700 p-8 w-76 mx-96 mt-6 pb-8'>
                                                                        <h3 className='fw-bold text-2xl mx-6 text-center pb-4 underline  underline-offset-auto text-white'>Car Information</h3>
                                                                        <div className="row mt-4">
                                                                                <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Car Name:</h3></div>
                                                                                <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-yellow-200 pt-1 pb-1 rounded-full">{carName}</h3></div>
                                                                        </div>
                                                                        <div className="row mt-4">
                                                                                <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Car Model:</h3></div>
                                                                                <div className="col-md-2 text-center"><h3 className="fw-bold text-xl bg-yellow-200 pt-1 pb-1 rounded-full">{carModel}</h3></div>
                                                                        </div>
                                                                        <div className="row mt-4">
                                                                                <div className="col-md-3 mx-4"> <h3 className="fw-bold text-xl text-yellow-400">Palate Number:</h3></div>
                                                                                <div className="col-md-3 text-center"><h3 className="fw-bold text-xl bg-yellow-200 pt-1 pb-1 rounded-full">{palateNumber}</h3></div>
                                                                        </div>
                                                                </div>
                                                                :

                                                                <div className="flex justify-center mt-8">
                                                                        <div className="row">
                                                                                <div className="w-96 col-md-6 card drop-shadow-xl bg-car p-8">
                                                                                        <h3 className="fw-bold text-4xl text-yellow-500 text-center">Package-1</h3>
                                                                                        <h3 className="fw-bold text-2xl text-center mt-8 text-white">For Car driving lessons </h3>
                                                                                        <h3 className="fw-bold text-2xl text-center mt-2 text-white">$200 </h3>
                                                                                        <Elements stripe={stripePromise}>
                                                                                                <CheckOutForm />
                                                                                        </Elements>
                                                                                </div>
                                                                                <div className="w-96 col-md-6 card drop-shadow-xl bg-bike p-8 ms-4">
                                                                                        <h3 className="fw-bold text-4xl text-yellow-500 text-center">Package-2</h3>
                                                                                        <h3 className="fw-bold text-2xl text-center mt-8 text-white">For Bike driving lessons </h3>
                                                                                        <h3 className="fw-bold text-2xl text-center mt-2 text-white">$100 </h3>
                                                                                        <Elements stripe={stripePromise}>
                                                                                                <CheckOutForm />
                                                                                        </Elements>
                                                                                </div>
                                                                        </div>

                                                                </div>
                                                }
                                        </div>
                                        :
                                        <Admin></Admin>
                        }
                </div>
        );
};

export default Profile;