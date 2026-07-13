import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authApi } from "../api/api";
import { useAuthStore } from "../store/useAuthStore";

import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const navigate = useNavigate();

  const loginStore = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await authApi.login(
        email,
        password
      );

      await loginStore(data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Card sx={{ width: 450 }}>
        <CardHeader
          title="Login"
          subheader="Enter your credentials to continue"
        />

        <CardContent>
          <form onSubmit={login}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                mt: 2,
                height: 48,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}