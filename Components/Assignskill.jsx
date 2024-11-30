import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const skillsList = [
    'C',
    'C++',
    'Java',
    'Python',
    'JavaScript',
    'Go',
    'Ruby',
    'PHP'
];

const Assignskill = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        const skill = event.target.value;
        setSelectedSkills((prevSkills) =>
            prevSkills.includes(skill)
                ? prevSkills.filter((s) => s !== skill)
                : [...prevSkills, skill]
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/dashboard/assignskill', { selectedSkills })
            .then(result => {
                console.log(result);
                navigate('/emdashboard'); // Redirect to project dashboard
            })
            .catch(err => console.log(err));
            navigate('/emdashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            {skillsList.map((skill) => (
                <div key={skill}>
                    <input
                        type="checkbox"
                        value={skill}
                        onChange={handleCheckboxChange}
                    />
                    <label>{skill}</label>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Assignskill;