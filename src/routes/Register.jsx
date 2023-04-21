import { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Login.css";

function Register() {
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    userName: "",
    Password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    console.log(registerFormData)
  
   
  }, [registerFormData])
  


  const [formError, setFormError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      userName: registerFormData?.userName,
      password: registerFormData?.Password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    

    fetch(`https://localhost:7095/api/Auth/RegisterUser`, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: config.headers
    }).then(response => {
      if (response?.status === 200)
        navigate('/login');
      else
      {
       response.text().then(setFormError);
      }
    }).catch(() => {
      alert("")
    })

  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "90vh",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "2rem",
            gap: "16px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <h2>Register</h2>
          <label htmlFor="userName">
            Username
          </label>
          <input
            required
            id="userName"
            placeholder="Username"
            value={registerFormData?.userName}
            onChange={(event) =>
              setRegisterFormData({
                ...registerFormData,
                userName: event.target.value,
              })
            }
          />

          <label htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            value={registerFormData.Password}
            onChange={(event) =>
              setRegisterFormData({
                ...registerFormData,
                Password: event.target.value,
              })
            }
            id="password"
            placeholder="Password"
          />
          <label htmlFor="confirmpassword">
            Confirm Password
          </label>
          <input
            required
            type="password"
            value={registerFormData.ConfirmPassword}
            onChange={(event) => {
              setRegisterFormData({
                ...registerFormData,
                ConfirmPassword: event.target.value,
              })
              if(registerFormData.Password !== event.target.value)
                setFormError('Password doesn\'t match');
              else
                setFormError(false);
            }}
            id="confirmpassword"
            placeholder="Confirm password"
          />
          {formError && <p style={{ color: 'red' }}>{formError}</p>}

          <button>
            Submit
          </button>
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            {" "}
            <Link to="/" className="link">
              Already user ? Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
