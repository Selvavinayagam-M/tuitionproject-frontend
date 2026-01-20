export const invoicesData = [
    { id: "INV-001", student: "Aarav Sharma", amount: "₹5000", date: "2024-01-02", dueDate: "2024-01-10", status: "Paid" },
    { id: "INV-002", student: "Vivaan Gupta", amount: "₹6000", date: "2024-01-05", dueDate: "2024-01-15", status: "Pending" },
    { id: "INV-003", student: "Diya Singh", amount: "₹5000", date: "2024-01-01", dueDate: "2024-01-08", status: "Overdue" },
];

export const invoiceColumns = [
    { key: 'id', label: 'Invoice ID' },
    { key: 'student', label: 'Student' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'status', label: 'Status' },
];
