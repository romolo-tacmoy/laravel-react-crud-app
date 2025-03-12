import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export default function Home() {
    const { user } = useContext(AppContext);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {user ? (
                <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</h2>
                    <div className="space-y-3">
                        <p><span className="font-semibold">ID:</span> {user.id}</p>
                        <p><span className="font-semibold">Name:</span> {user.name}</p>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Joined:</span> {new Date(user.created_at).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Last Updated:</span> {new Date(user.updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
            ) : (
                <h1 className="text-3xl font-bold text-gray-700">Welcome Home</h1>
            )}
        </div>
    );
}
