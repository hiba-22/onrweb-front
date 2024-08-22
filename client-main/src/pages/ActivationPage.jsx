import React, { useEffect, useState, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from "../components/shared/Navbar";
const Activate = () => {
   
    const { token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auth/verify/${token}`);
                const data = await response.json();
                if (response.ok) {
                    setMessage(data.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Activation Successful',
                        text: data.message,
                    }).then(() => {
                        navigate('/login'); // Redirect after alert is closed
                    });
                }
            } catch (error) {
                setMessage('An error occurred.');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred.',
                }).then(() => {
                    navigate('/login'); // Redirect after alert is closed
                });
            } finally {
                setIsLoading(false);
            }
        };

        activateAccount();
       
       
    }, [token, navigate]);

    return (
        <>
        <Navbar />
        <div>
            <h1>{isLoading ? 'Activating...' : message}</h1>
        </div>
        </>
    );
};

export default Activate;
