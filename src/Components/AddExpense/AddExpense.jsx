import { useState } from "react"
import Dialog from "@mui/material"
import DialogTitle from "@mui/material"
import DialogContent from "@mui/material"
import TextField from "@mui/material"
import Button from "@mui/material"
import API from "../Axios/Axios"

export default function AddExpense({ open, handleClose, refresh }) {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [bill, setBill] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("amount", amount);
      formData.append("expense_date", date);

      if (bill) formData.append("bill", bill);

      await API.post("/expenses/post", formData);

      alert("Expense Added ");

      refresh();
      handleClose();
    } catch (err) {
      console.log(err);
      alert("Failed ");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Expense</DialogTitle>

      <DialogContent>
        <TextField
          label="Reason"
          fullWidth
          margin="normal"
          onChange={(e) => setReason(e.target.value)}
        />

        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          type="date"
          fullWidth
          margin="normal"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setBill(e.target.files[0])}
          style={{ marginTop: "15px" }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Save Expense
        </Button>
      </DialogContent>
    </Dialog>
  );
}