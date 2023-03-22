import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const JoinAsRider = () => {
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
                let carName = e.target.carName.value;
                let carModel = e.target.carModel.value;
                let palateNumber = e.target.palateNumber.value;


                // Error Handling:
                if (!/^[0-9]{6}$/.test(password)) {
                        setPasswordError('Password Must be 6 digit number!')
                        return;
                }
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                        setEmailError("Enter Valid Email!")
                        return;
                }

                if (password !== confirmPassword) {
                        return toast.error("Password didn't match");
                }

                const formData = new FormData();

                formData.append('image', selectedFile);
                const imgUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
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
                                        profileType: 'rider',
                                        carName: carName,
                                        carModel: carModel,
                                        palateNumber: palateNumber
                                }
                                console.log(member);
                                const url = 'http://localhost:5000/registration';
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


                                                }
                                                else {
                                                        toast("Something Went Wrong. Please ry again!")
                                                }
                                        })

                        })


                setPasswordError('');
                setEmailError('')
        }
        // Navigate To Learner:
        const navigate = useNavigate();
        const navigateToLearner = () => {
                navigate('/learner')
        }
        // Navigate To Login:
        const navigateToLogin = () => {
                navigate('/')
        }
        return (
                <div className="flex justify-center items-center mt-16 pb-16">
                        <div className="card w-90 bg-base-100 shadow-xl pt-4 pb-8">
                                <div className="card-body">
                                        <h2 className="text-center font-bold text-3xl">Join as A Rider</h2> <br />

                                        <form onSubmit={handleLearner}>
                                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-96 max-w-xs mt-8" required />
                                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs mt-4 ms-4" required />
                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>

                                                <input type="number" name="age" placeholder="Your Age" className="input input-bordered w-full max-w-xs mt-8 w-96" required />
                                                <input type="text" name="address" placeholder="Your Address" className="input input-bordered w-full max-w-xs mt-8 ms-4" required />
                                                <input type="text" name="phone" placeholder="Your Phone Number" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <h3 className='pt-3 fw-bold'>Your Profile Picture:</h3>
                                                <input type="file" onChange={handleProfilePic} placeholder="Your Profile Picture" className=" max-w-xs mt-2" required />
                                                <h3 className='pt-3 fw-bold'>Car Information:</h3>
                                                <input type="text" name="carName" placeholder="Car Name" className="input input-bordered w-full max-w-xs w-96" required />
                                                <input type="text" name="carModel" placeholder="Car Model" className="input input-bordered w-full max-w-xs mt-3 ms-4" required />
                                                <input type="text" name="palateNumber" placeholder="Name Palate Number" className="input input-bordered w-full max-w-xs w-96 mt-4" required />
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
                                                <input type="submit" value="Registration as a Rider" className="btn input-bordered w-full max-w mt-4" />

                                        </form>
                                </div>
                                <div className="pl-8 pb-12">
                                        <h3>Want to be Learner? Please <span
                                                onClick={() => navigateToLearner()}
                                                className="text-orange-700 font-bold cursor-pointer"
                                        >Registration as a Learner</span></h3>
                                </div>
                                <div className="pl-8 pb-12">
                                        <h3>Want to Login? Please <span
                                                onClick={() => navigateToLogin()}
                                                className="text-orange-700 font-bold cursor-pointer"
                                        >Click Here</span></h3>
                                </div>
                        </div>
                </div>
        );
};

export default JoinAsRider;