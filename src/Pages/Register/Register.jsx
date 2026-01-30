import { useState } from "react"
import TextField from "@mui/material"
import Button from "@mui/material"
import Box from "@mui/material"
import Typography from "@mui/material"
import Paper from "@mui/material"
import { useNavigate } from "react-router-dom"
import API from "../Axios/Axios"

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully ");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Register Failed ");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 2,
            padding: 1,
          }}
          onClick={register}
        >
          Register
        </Button>

        <Typography mt={2} textAlign="center">
          Already have an account?{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}
