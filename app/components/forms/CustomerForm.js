"use client";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; // For layout
import Box from "@mui/material/Box"; // Box for padding and layout
import Typography from "@mui/material/Typography"; // Add Typography for better headings

export default function CustomerForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  return (
    <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register("name", { required: true })}
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined" // Use outlined variant for a modern look
              InputLabelProps={{ shrink: true }} // Keeps the label above the field
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("dob", { required: true })}
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }} // Keeps the label above the field
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("memberNumber", { required: true })}
              label="Member Number"
              type="number"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }} // Keeps the label above the field
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("interests", { required: true })}
              label="Interests"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }} // Keeps the label above the field
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
