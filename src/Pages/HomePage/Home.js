import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

        return (
                <div>
                        <Link to="/rider" className="btn btn-wide">Join as a Rider</Link>
                        <Link to="/learner" className="btn btn-wide">Join as a Learner</Link>
                </div>
        );
};

export default Home;