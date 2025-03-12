import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const {setToken, setIsNewlyRegistered} = useContext(AppContext);

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
    
     
        const res = await fetch('http://127.0.0.1:8000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if (!res.ok) {  // If the response is not OK (e.g., 400 Bad Request)
            console.error("Registration failed:", data);
            if (data.errors) {
                setErrors(data.errors);
                console.error("Errors:", data.errors); // Log error messages
            }
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/login");
           
            setIsNewlyRegistered(true);
            setErrors({});
        }
    }
        
    return (
        <>
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
                    <input type="text" placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>
                <div>
                    <input type="text" placeholder="Enter Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}/>
                    {errors.password_confirmation && <p className="error">{errors.password_confirmation[0]}</p>}
                </div>

                <button className="primary-btn">Register</button>
            </form>
        </>
    );
}