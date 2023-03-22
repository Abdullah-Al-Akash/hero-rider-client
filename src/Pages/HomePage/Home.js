import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
        const navigate = useNavigate();
        const currentUser = localStorage.getItem('user');
        console.log(currentUser);
        useEffect(() => {
                if (currentUser) {
                        navigate('/profile')
                }
        }, [currentUser]);
        // Handle Registration Form:
        const [passwordError, setPasswordError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [userNotFound, setUserNotFound] = useState('');
        const handleLogin = e => {
                e.preventDefault();
                let email = e.target.email?.value;
                let password = e.target.password.value;

                // Error Handling:
                if (!/^[0-9]{6}$/.test(password)) {
                        setPasswordError('Password Must be 6 digit number!')
                        return;
                }
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                        setEmailError("Enter Valid Email!")
                        return;
                }
                localStorage.setItem("user", email);

                // fetch('https://power-hack-billing-backend.vercel.app/login', {
                //         method: 'POST',
                //         headers: {
                //                 'content-type': 'application/json'
                //         },
                //         body: JSON.stringify({ email, password })
                // })
                //         .then(res => res.json())
                //         .then(data => {
                //                 if (data.success) {
                //                         localStorage.setItem("token", data.accessToken);
                //                         const currentUser = users?.find(user => user?.email === email && user?.password == password);
                //                         // localStorage.setItem("user", currentUser?.email);
                //                         toast.success("Successfully Login");
                //                         navigate('/');
                //                         setUserNotFound('')
                //                 }
                //                 else {
                //                         toast.error("Something went wrong. Please try again!");
                //                         setUserNotFound('User not found!')
                //                 }
                //         })
                setPasswordError('');
                setEmailError('')
        }

        // Navigate To Register:
        const navigateToRegister = () => {
                navigate('/registration')
        }

        return (
                <div className="main-bg h-screen flex justify-content-center align-items-center">
                        <div className="flex-initial w-50">
                                <div className="flex justify-center items-center h-screen">
                                        <div className="card w-96 bg-base-100 shadow-xl">
                                                <div className="card-body">
                                                        <h2 className="text-center font-bold text-2xl">Please Login!</h2>
                                                        <div>
                                                                <h4 className="font-bold text-sm">For Admin Credential: <br />Email: admin@admin.com <br /> Password: abcd1234</h4>

                                                        </div>
                                                        <form onSubmit={handleLogin}>
                                                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs mt-4" required />
                                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>
                                                                <input type="password" name="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs mt-4" required />
                                                                <h3 className="text-red-600 pl-2">{passwordError ? passwordError : ''}</h3>
                                                                <input type="submit" value="Login" className="btn input-bordered btn-success bg-black text-white fw-bold w-full max-w-xs mt-4" />
                                                                <h3 className="text-red-600 pl-2">{userNotFound ? userNotFound : ''}</h3>
                                                        </form>
                                                </div>
                                                <div className="pl-8 pb-12">
                                                        <h3>Not have any account? Please <span
                                                                onClick={() => navigateToRegister()}
                                                                className="text-orange-700 font-bold cursor-pointer"
                                                        >Register Here!</span></h3>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div className="flex-initial w-50">
                                <h1 className="text-white text-xl"><span className="fw-bold text-5xl text-yellow-400 me-2">Hero Rider</span> is a ride sharing startup.</h1>
                                <h1 className="text-white text-xl mt-2">A driver who has his/her own or rented car can give rides to other people.</h1>
                                <h1 className="text-white text-xl mt-2"> We also provide driving lessons services. </h1>
                                <div className="mt-5">
                                        <Link to="/rider" className="btn btn-wide btn-warning bg-yellow-400 me-3 fw-bold">Join as a Rider</Link>
                                        <Link to="/learner" className="btn btn-wide btn-warning bg-yellow-400 fw-bold">Join as a Learner</Link>
                                </div>
                        </div>
                </div>
        );
};

export default Home;