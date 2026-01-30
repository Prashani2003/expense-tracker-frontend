import { useEffect, useState } from "react"
import ExpenseCard from "../../Components/ExpenseCard/ExpenseCard"
import Box from "@mui/material"
import Typography from "@mui/material"
import Button from "@mui/material"
import TextField from "@mui/material"
import Grid from "@mui/material"
import Container from "@mui/material"
import AddExpense from "../../Components/AddExpense/AddExpense"
import API from "../Axios/Axios"

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchExpenses = async (date = "") => {
    try {
      let url = "/expenses/get";
      if (date) url = /expenses/date-picker?date=${date};
      const res = await API.get(url);
      setExpenses(res.data);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>Filter:</Typography>
          <TextField
            type="date"
            size="small"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              fetchExpenses(e.target.value);
            }}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
          {selectedDate && (
            <Button color="secondary" onClick={() => { setSelectedDate(""); fetchExpenses(); }}>
              Clear
            </Button>
          )}
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 2, fontWeight: 'bold' }}
        >
          + Add Expense
        </Button>
      </Box>

      <Grid container spacing={3}>
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <Grid item xs={12} sm={6} md={4} key={exp.id}>
              <ExpenseCard data={exp} />
            </Grid>
          ))
        ) : (
          <Box width="100%" textAlign="center" mt={5}>
            <Typography color="textSecondary">No expenses found for this selection.</Typography>
          </Box>
        )}
      </Grid>

      <AddExpense
        open={open}
        handleClose={() => setOpen(false)}
        refresh={() => fetchExpenses(selectedDate)}
      />
    </Container>
  );
}