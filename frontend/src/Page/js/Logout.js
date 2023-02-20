import { useEffect } from "react";
function Logout() {
    useEffect(() => {
        const LoggedOut = async () => {
            localStorage.clear()
            window.location.href = 'http://localhost:3006/'
        };
        LoggedOut();
    }, []);
}

export default Logout;
