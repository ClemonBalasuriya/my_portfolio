import { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import Home from "./home";
import Login from '../Login';
import { auth } from '../../firebase';

const Dashboard = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!auth) {
            setUser(null);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, []);


    return (
       <div>
           {user ? <Home /> : <Login />}
       </div>
    )
}

export default Dashboard;