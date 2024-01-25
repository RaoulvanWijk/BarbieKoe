import { useData } from "@/lib/hooks/fetch"
import { useState, useRef, useEffect } from "react"
import "/resources/styles/components/layout/profile.scss"
import { SafeUser } from "@/lib/types/database";

export default function Profile() {
    const user = useData<SafeUser>('/api/auth/me');
    const [isDropdownActive, setIsDropdownActive] = useState(false); // Add state for dropdown activation
    const ref = useRef<any>(null);

    const handleDropdownClick = () => {
        setIsDropdownActive(!isDropdownActive); // Toggle dropdown activation state
    };

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsDropdownActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div ref={ref}>
            <div className="profile" onClick={handleDropdownClick} >
                <img src={user?.profile_picture ?? ""} alt="Profile" />
                <p>{user?.username}</p>
            </div>

            <div className={`profile-dropdown ${isDropdownActive ? 'active' : ''}`} onClick={handleDropdownClick}>
                <ul>
                    <li>
                        <a href="#">Profiel</a>
                    </li>
                    <li>
                        <a href="#">Instellingen</a>
                    </li>
                    <li>
                        <a href="/api/auth/logout">Uitloggen</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
