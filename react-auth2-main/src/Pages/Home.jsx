import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Home() {
    const { user, isAuthenticated } = useContext(AppContext);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div className="mt-40 px-4 py-20 bg-gray-50">
                        <div className="space-y-4">
                            <h1 className="title text-left">Hello, I'm {user.name}</h1>
                            <h4>I'm a Front-End Developer passionate about crafting beautiful and user-friendly websites.</h4>
                            <button className="primary-btn w-50">VIEW MY WORK</button>
                        </div>
                    </div>
                    
                    <div className="mt-64 px-4 py-10 bg-gray-100">
                        <h1 className="title">About me</h1>
                        <div className="text-center">
                            <div className="info">
                                <h2 className="font-bold text-2xl">Personal Information</h2>
                                <ul className="personal">
                                    <li>First Name: Romolo</li>
                                    <li>Last Name: Tacmoy</li>
                                    <li>Middle Name: Almazan</li>
                                    <li>Civil Status: Single</li>
                                    <li>Nationality: Filipino</li>
                                    <li>Address: Cabuyao City, Laguna</li>
                                    <li>Language: Tagalog</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-40">
                    <h1 className="title">Home Page</h1>
                </div>
            )}
        </>
    );
}
