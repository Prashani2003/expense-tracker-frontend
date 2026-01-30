import Card from "@mui/material"
import CardContent from "@mui/material"
import Typography from "@mui/material"
import Box from "@mui/material"
import Divider from "@mui/material"
import CardMedia from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

export default function ExpenseCard({ data }) {
  const formattedDate = new Date(data.expense_date).toLocaleDateString();

  return (
    <Card sx={{ 
      borderRadius: 4, 
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "0.3s",
      "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }
    }}>
      {data.bill_image && (
        <CardMedia
          component="img"
          height="160"
          image={`http://localhost:3000/uploads/bills/${data.bill_image}`}
          alt="Bill Receipt"
        />
      )}

      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#333" }}>
            {data.reason}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Rs. {data.amount}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box display="flex" alignItems="center" gap={1} color="text.secondary">
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2">{formattedDate}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}