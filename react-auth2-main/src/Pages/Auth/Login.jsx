import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();

        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: "include"
        });

        const csrfToken = decodeURIComponent(
            document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('XSRF-TOKEN=')[1] || ''
          );
        console.log(csrfToken);

        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": csrfToken
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            setUser(data.user);
            setErrors({});
            navigate("/dashboard"); 

            const userRes = await fetch("http://localhost:8000/api/user", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": csrfToken
                },
                credentials: "include",
            });
    
            console.log(userRes);

            if (userRes.ok) {
                const userData = await userRes.json();
                setUser(userData);
            } else {
                console.error("Failed to fetch user:", userRes.status);
            }
       }
    }

    return (
        <>
            <div className="card">
                <h1 className="title">Sign in</h1>
                <form onSubmit={handleLogin} className="w-72 mx-auto space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        {errors.email && <p className="error">{errors.email[0]}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        {errors.password && (
                            <p className="error">{errors.password[0]}</p>
                        )}
                    </div>

                    {errors.general && <p className="error">{errors.general[0]}</p>}

                    <button className="primary-btn">Login</button>
                </form>
            </div>
        </>
    );
}
