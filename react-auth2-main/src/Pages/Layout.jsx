import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import Logo from '../assets/logo.png';

export default function Layout() {
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
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

        const res = await fetch("http://localhost:8000/logout", {
            method: "POST",
            headers: {
                "X-XSRF-TOKEN": csrfToken
            },
            credentials: "include"
        });

        if(res.ok) {
            setUser(null);
            navigate('/');
        }
    }

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="flex items-center text-slate-100 space-x-2 text-3xl">
                        <img src={Logo}/>
                    </Link>
                    {user ? (
                        <div className="flex items-center space-x-4 ml-auto">
                            <p className="text-slate-100 text-lg font-medium">
                                Hi, {user.name}!
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
