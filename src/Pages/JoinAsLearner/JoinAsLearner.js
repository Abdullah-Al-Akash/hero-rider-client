import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Users from '../hooks/Users';
import './JoinAsLearner.css';


const JoinAsLearner = () => {
        const [members] = Users();
        const imageHostKey = '4183cea48c4e5701d0cdbb24c4c45488';
        // Handle Registration Form:
        const [passwordError, setPasswordError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [carType, setCarType] = useState('car');


        const handleCarType = car => {
                setCarType(car);
        }
        // Handle Profile Image:
        const [selectedFile, setSelectedFile] = useState();
        const [profilePic, setProfilePic] = useState('');

        const handleProfilePic = (event) => {
                setSelectedFile(event.target.files[0]);
        };

        const handleLearner = e => {
                e.preventDefault();
                let name = e.target.name.value;
                let email = e.target.email.value;
                let password = e.target.password.value;
                let confirmPassword = e.target.confirmPassword.value;
                let age = e.target.age.value;
                let phone = e.target.phone.value;
                let vehicle = carType;
                const getAnotherAccount = members?.find(member => member?.email === email);

                // Error Handling:
                // if (!/^[0-9]{8}$/.test(password)) {
                //         setPasswordError('Password Must be 8 digit number!')
                //         return;
                // }
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                        setEmailError("Enter Valid Email!")
                        return;
                }

                if (password !== confirmPassword) {
                        return toast.error("Password didn't match");
                }
                // Check Already have an account or not:
                if (getAnotherAccount) {
                        return toast.warning('Already have an account by this email!');
                }
                else {
                        const formData = new FormData();

                        formData.append('image', selectedFile);
                        const imgUrl = `https://api.imgbb.com/1/upload?expiration=10000&key=${imageHostKey}`
                        fetch(imgUrl, {
                                method: 'POST',
                                body: formData
                        })
                                .then(res => res.json())
                                .then(imgData => {
                                        setProfilePic(imgData?.data?.url);
                                        // console.log(imgData?.data?.url)
                                        const member = {
                                                name: name,
                                                email: email,
                                                password: password,
                                                age: age,
                                                phone: phone,
                                                vehicle: vehicle,
                                                image: imgData?.data?.url,
                                                profileType: 'learner',
                                                carName: '',
                                                carModel: '',
                                                palateNumber: '',
                                                role: 'member',
                                                status: 'pending'
                                        }
                                        console.log(member);
                                        const url = 'https://hero-rider-server-nine.vercel.app/registration';
                                        fetch(url, {
                                                method: "POST",
                                                headers: {
                                                        "content-type": "application/json"
                                                },
                                                body: JSON.stringify(member)
                                        })
                                                .then(res => res.json())
                                                .then(result => {
                                                        console.log(result)
                                                        if (result.acknowledged) {

                                                                toast.success("Registration Successfully Done!");
                                                                localStorage.setItem('user', email);
                                                                navigate('/profile');

                                                        }
                                                        else {
                                                                toast("Something Went Wrong. Please ry again!")
                                                        }
                                                })

                                })
                }


                setPasswordError('');
                setEmailError('')
        }

        // Navigate To Rider:
        const navigate = useNavigate();
        const navigateToRider = () => {
                navigate('/rider')
        }
        // Navigate To Login:
        const navigateToLogin = () => {
                navigate('/')
        }
        return (
                <div className="flex form-bg justify-center items-center pt-16 pb-16">
                        <div className="card w-90 bg-yellow-100 shadow-xl pt-4 pb-8">
                                <div className="card-body">
                                        <h2 className="text-center font-bold text-3xl">Join as a Driving Lesson Learner</h2> <br />

                                        <form onSubmit={handleLearner}>
                                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-96 max-w-xs mt-8" required />
                                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs mt-4 ms-4" required />
                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>

                                                <input type="number" name="age" placeholder="Your Age" className="input input-bordered w-full max-w-xs mt-8 w-96" required />
                                                <input type="text" name="address" placeholder="Your Address" className="input input-bordered w-full max-w-xs mt-8 ms-4" required />
                                                <input type="text" name="phone" placeholder="Your Phone Number" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <h3 className='pt-3 fw-bold'>Your Profile Picture:</h3>
                                                <input type="file" onChange={handleProfilePic} placeholder="Your Profile Picture" className=" max-w-xs mt-2" required />
                                                {/* <h3 className='pt-3 fw-bold'>Your NID Picture:</h3>
                                                <input type="file" onChange={handleNIDPic} placeholder="Your Profile Picture" className=" max-w-xs mt-2" required /> */}
                                                <h3 className='pb-3 pt-3 fw-bold'>Select Vehicle Type:</h3>
                                                <select className="form-select" aria-label="Default select example" onChange={e => handleCarType(e.target.value)} value={carType}>
                                                        <option value="car">Car</option>
                                                        <option value="bike">Bike</option>
                                                </select>
                                                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-xs mt-4 w-96" required />
                                                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs mt-4 ms-4" required />
                                                <h3 className="text-red-600 pl-2">{passwordError ? passwordError : ''}</h3>
                                                <input type="submit" value="Registration as a Learner" className="btn input-bordered w-full max-w mt-4 bg-dark text-white" />

                                        </form>
                                </div>
                                <div className="pl-8 pb-3 text-center">
                                        <h3>Want to be Rider? Please <span
                                                onClick={() => navigateToRider()}
                                                className="text-orange-700 font-bold cursor-pointer"
                                        >Registration as a Rider</span></h3>
                                </div>

                                <div className="pl-8 pb-12 text-center">
                                        <h3>Want to Login? Please <span
                                                onClick={() => navigateToLogin()}
                                                className="text-orange-700 font-bold cursor-pointer"
                                        >Click Here</span></h3>
                                </div>
                        </div>
                </div>
        );
};

export default JoinAsLearner;