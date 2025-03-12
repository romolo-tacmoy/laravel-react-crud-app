import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const { setToken, setUser, setIsNewlyRegistered } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token); 
            setToken(data.token);
            setUser(data.user);
            setIsNewlyRegistered(false);
            navigate("/"); 
        }
    }

    return (
        <>
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
        </>
    );
}
