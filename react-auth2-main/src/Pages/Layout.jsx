import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";

export default function Layout() {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000/logout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if(res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            navigate('/');
        }
    }

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">
                        Brand Logo
                    </Link>
                    {user ? (
                        <div className="flex items-center space-x-4 ml-auto">
                            <p className="text-slate-100 text-sm font-medium">
                                Welcome {user.name}
                            </p>
                            <form onSubmit={handleLogout}>
                                <button className="nav-link">Logout</button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4 ml-auto">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}
