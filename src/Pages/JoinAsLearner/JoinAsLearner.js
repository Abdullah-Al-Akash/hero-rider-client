import React, { useState } from 'react';
import { toast } from 'react-toastify';

const JoinAsLearner = () => {
        const imageHostKey = '4183cea48c4e5701d0cdbb24c4c45488';
        // Handle Registration Form:
        const [passwordError, setPasswordError] = useState('');
        const [emailError, setEmailError] = useState('');
        const [carType, setCarType] = useState('car');


        const handleCarType = car => {
                setCarType(car);
        }
        // Handle Image:
        const [selectedFile, setSelectedFile] = useState();
        const [isFilePicked, setIsFilePicked] = useState(false);
        const [profilePic, setProfilePic] = useState('');

        const changeHandler = (event) => {
                setSelectedFile(event.target.files[0]);
                setIsFilePicked(true);
        };

        const handleLearner = e => {
                e.preventDefault();
                let name = e.target.name.value;
                let email = e.target.email.value;
                let password = e.target.password.value;
                let age = e.target.age.value;
                let phone = e.target.phone.value;
                let vehicle = carType;
                let image = selectedFile;



                const formData = new FormData();

                formData.append('image', selectedFile);
                const imgUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
                fetch(imgUrl, {
                        method: 'POST',
                        body: formData
                })
                        .then(res => res.json())
                        .then(imgData => {
                                console.log(imgData);
                                setProfilePic(imgData?.data?.url);
                        })


                // Error Handling:
                if (!/^[0-9]{6}$/.test(password)) {
                        setPasswordError('Password Must be 6 digit number!')
                        return;
                }
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                        setEmailError("Enter Valid Email!")
                        return;
                }
                const member = {
                        name: name,
                        email: email,
                        password: password,
                        age: age,
                        phone: phone,
                        vehicle: vehicle,
                        image: profilePic
                }
                console.log(member);
                // const url = 'http://localhost:5000/registration';
                // fetch(url, {
                //         method: "POST",
                //         headers: {
                //                 "content-type": "application/json"
                //         },
                //         body: JSON.stringify(member)
                // })
                //         .then(res => res.json())
                //         .then(result => {
                //                 console.log(result)
                //                 if (result.acknowledged) {

                //                         toast.success("Registration Successfully Done!");


                //                 }
                //                 else {
                //                         toast("Something Went Wrong. Please ry again!")
                //                 }
                //         })

                setPasswordError('');
                setEmailError('')
        }
        return (
                <div className="flex justify-center items-center h-screen">
                        <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                        <h2 className="text-center font-bold text-2xl">Please Complete The Form</h2>
                                        <form onSubmit={handleLearner}>
                                                <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs mt-4" required />
                                                <h3 className="text-red-600 pl-2">{emailError ? emailError : ''}</h3>
                                                <input type="password" name="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs mt-4" required />
                                                <input type="number" name="age" placeholder="Your Age" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <input type="text" name="address" placeholder="Your Address" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <input type="text" name="phone" placeholder="Your Phone Number" className="input input-bordered w-full max-w-xs mt-8" required />
                                                <h3 className='pt-3 fw-bold'>Your Profile Picture:</h3>
                                                <input type="file" onChange={changeHandler} placeholder="Your Profile Picture" className=" max-w-xs mt-2" required />
                                                <h3 className='pb-3 pt-3 fw-bold'>Select Vehicle Type:</h3>
                                                <select className="form-select" aria-label="Default select example" onChange={e => handleCarType(e.target.value)} value={carType}>
                                                        <option value="car">Car</option>
                                                        <option value="bike">Bike</option>
                                                </select>
                                                <h3 className="text-red-600 pl-2">{passwordError ? passwordError : ''}</h3>
                                                <input type="submit" value="Registration" className="btn input-bordered w-full max-w-xs mt-4" />

                                        </form>
                                </div>
                        </div>
                </div>
        );
};

export default JoinAsLearner;