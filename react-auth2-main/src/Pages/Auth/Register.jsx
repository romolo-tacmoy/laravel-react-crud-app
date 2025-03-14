import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState({})

    async function handleRegister(e) {
        e.preventDefault();
        
        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: "GET",
            credentials: "include"
        });

        const csrfToken = decodeURIComponent(
            document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('XSRF-TOKEN=')[1] || ''
          );
        console.log(csrfToken);
     
        const res = await fetch('http://localhost:8000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": csrfToken
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        if (!res.ok) {  
            console.error("Registration failed:", res);
            if (res.errors) {
                setErrors(res.errors);
                console.error("Errors:", res.errors);
            }
        } else {
            navigate("/login");
            console.log(res);
        }
    }
        
    return (
        <>
            <div className="card">
                <h1 className="title">Sign up</h1>
                <form onSubmit={handleRegister} className="w-72 mx-auto space-y-6">
                    <div>
                        <input type="text" placeholder="Enter Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        {errors.name && <p className="error">{errors.name[0]}</p>}
                    </div>
                    <div>
                        <input type="text" placeholder="Enter Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                        {errors.email && <p className="error">{errors.email[0]}</p>}
                    </div>
                    <div>
                        <input type="password" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                        {errors.password && <p className="error">{errors.password[0]}</p>}
                    </div>
                    <div>
                        <input type="password" placeholder="Enter Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}/>
                        {errors.password_confirmation && <p className="error">{errors.password_confirmation[0]}</p>}
                    </div>

                    <button className="primary-btn">Register</button>
                </form>
            </div>
        </>
    );
}