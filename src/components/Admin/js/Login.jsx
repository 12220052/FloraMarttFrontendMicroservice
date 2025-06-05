import  { useState } from 'react';
// import { useDispatch} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { setCredentials } from '../../../slices/authSlice';
// import { useLoginMutation } from '../../../slices/usersApiSlice';
import logo from '../../../assets/logo.png';
import axios from 'axios';


function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const dispatch = useDispatch();
  const navigate = useNavigate();


  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // Role-based redirect function
 const handleRoleRedirect = (user) => {
  const roles = user?.authorities?.map((a) => a.authority) || [];

  if (roles.includes('Admin')) {
      console.log("dfghjk")
    navigate('/admindashboard');
  } else if (roles.includes('Vendor')) {
      console.log("dfghjk")
    navigate('/vendordashboard');
  } else if (roles.includes('Client')) {
    console.log("dfghjk")
    navigate('/clientdashboard'); // Add this route to App.jsx if not already present
  } else {
    navigate('/');
  }
};

//  useEffect(() => {
//   if (userInfo?.user) {
//     if (redirect && redirect !== '/') {
//       navigate(redirect);
//     } else {
//       handleRoleRedirect(userInfo.user);
//     }
//   }
// }, [userInfo, redirect, navigate]);



const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:8765/USERMICROSERVICE/api/auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    // Store token in localStorage
    localStorage.setItem('token', data.token);

    // Save token and user info to Redux
    // dispatch(setCredentials(data));
    toast.success('Login successful');

    // Redirect user based on their role
    if (redirect && redirect !== '/') {
      navigate(redirect);
    } else {
      handleRoleRedirect(data.user);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Login failed');
    console.error('Login Error:', error);
  }
};
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f5f3',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '800px',
          height: '400px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Left Form Section */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              fontSize: '22px',
              color: '#744f41',
              fontWeight: 'bold',
            }}
          >
            LOG IN
          </h2>

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  borderBottom: '2px solid #d4a6a6',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  borderBottom: '2px solid #d4a6a6',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '16px',
                }}
              />
            </div>

            <p
              style={{
                fontSize: '12px',
                color: '#744f41',
                marginTop: '10px',
                cursor: 'pointer',
                marginLeft: '200px',
                textDecoration: 'underline',
              }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </p>

            <button
              type="submit"
              // disabled={isLoading}
              style={{
                marginTop: '20px',
                backgroundColor: '#d4a6a6',
                border: 'none',
                padding: '10px 20px',
                color: 'white',
                fontSize: '14px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {'Login'}
            </button>
          </form>
        </div>

        {/* Right Logo Section */}
        <div
          style={{
            flex: 1,
            background: '#f3dedb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <img
            src={logo}
            alt="FloraMart Logo"
            style={{ width: '120px', marginBottom: '10px' }}
          />
          <h2 style={{ fontSize: '18px', color: '#744f41', fontWeight: 'bold' }}>
            Welcome to FloraMart
          </h2>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;


