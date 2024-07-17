import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const defaultLead = { name: '', email: '', phone: '' }

const LeadFormPage = () => {
    const { state } = useLocation();
    const productId = state?.id;  

    const [lead, setLead] = useState(defaultLead);

    const handleChange = (e) => {
        setLead( prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const leads = JSON.parse(localStorage.getItem('leads')) || [];
        leads.push(lead);
        localStorage.setItem("leads", JSON.stringify(leads));
        setLead(defaultLead);
        alert("Thank you for sharing your information. We will contact you ASAP.");
    };

    return !productId ?
        <Navigate to="/"/>
    : (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={lead.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="email"
                name="email"
                value={lead.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="text"
                name="phone"
                value={lead.phone}
                onChange={handleChange}
                placeholder="Phone"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default LeadFormPage;
