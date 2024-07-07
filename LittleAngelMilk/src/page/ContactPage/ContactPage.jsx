import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, Link } from '@mui/material';
import './ContactPage.css'; 
import Header from "../../component/header/Header";
import Footer from "../../component/footer/footer";
import BusinessIcon from '@mui/icons-material/Business';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';

const ContactPage = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [resultMessage, setResultMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {
      name: formValues.name === '',
      email: formValues.email === '',
      subject: formValues.subject === '',
      message: formValues.message === ''
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setResultMessage("Please fill out all fields.");
      return;
    }
    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setResultMessage("Please wait...");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      const jsonResponse = await response.json();
      if (response.status === 200) {
        setResultMessage(jsonResponse.message);
      } else {
        setResultMessage(jsonResponse.message);
      }
    } catch (error) {
      console.error(error);
      setResultMessage("Something went wrong!");
    }

    form.reset();
    setFormValues({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => {
      setResultMessage("");
    }, 3000);
  };

  return (
    <>
      <Header />
      <Box className="contact-page" sx={{ flexGrow: 1, padding: 4 }}>
        <Box className="contact-info" sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box className="contact-info-item">
            <BusinessIcon fontSize="large" />
            <Typography variant="body1" component="p">
              <strong>Address:</strong> Sir Matt Busby Way, Old Trafford, Manchester M16 0RA
            </Typography>
          </Box>
          <Box className="contact-info-item">
            <LocalPhoneIcon fontSize="large" />
            <Typography variant="body1" component="p">
              <strong>Phone:</strong> 0123456789
            </Typography>
          </Box>
          <Box className="contact-info-item">
            <EmailIcon fontSize="large" />
            <Typography variant="body1" component="p">
              <strong>Email:</strong> littleanglemart@gmail.com
            </Typography>
          </Box>
          <Box className="contact-info-item">
            <FacebookIcon fontSize="large" />
            <Typography variant="body1" component="p">
              <Link 
                href="https://www.facebook.com/profile.php?id=61562002083725" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'black', textDecoration: 'none' }}
              >
                <strong>Facebook:</strong> Little Angel Mart
              </Link>
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Kết nối với chúng tôi
              </Typography>
              <Box
                component="form"
                id="form"
                sx={{
                  '& .MuiTextField-root': { mb: 2 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="access_key" value="944f7f22-576f-435c-b37f-ec8cc8966231" />
                <TextField 
                  fullWidth 
                  label="Nhập tên của bạn" 
                  variant="outlined" 
                  name="name" 
                  required 
                  error={formErrors.name}
                  helperText={formErrors.name ? "Please provide your name" : ""}
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                <TextField 
                  fullWidth 
                  label="Nhập email của bạn" 
                  variant="outlined" 
                  type="email" 
                  name="email" 
                  required 
                  error={formErrors.email}
                  helperText={formErrors.email ? "Please provide your email" : ""}
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <TextField 
                  fullWidth 
                  label="Nhập chủ đề" 
                  variant="outlined" 
                  name="subject" 
                  required 
                  error={formErrors.subject}
                  helperText={formErrors.subject ? "Please provide your subject" : ""}
                  value={formValues.subject}
                  onChange={handleInputChange}
                />
                <TextField 
                  fullWidth 
                  label="Nhập tin nhắn của bạn" 
                  variant="outlined" 
                  multiline 
                  rows={4} 
                  name="message" 
                  required 
                  error={formErrors.message}
                  helperText={formErrors.message ? "Please provide your message" : ""}
                  value={formValues.message}
                  onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Gửi phản hồi
                </Button>
                <Box id="result" sx={{ mt: 2 }}>
                  {resultMessage}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105369846!2d106.8073080748835!3d10.841127589311585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1720322095479!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ContactPage;
