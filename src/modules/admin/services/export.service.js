import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportService = {
    toCSV: (data, filename) => {
        const csvContent = "data:text/csv;charset=utf-8," +
            data.map(e => Object.values(e).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    toPDF: (columns, data, title) => {
        const doc = new jsPDF();
        doc.text(title, 14, 20);

        const tableColumn = columns.map(col => col.label);
        const tableRows = data.map(row => columns.map(col => row[col.key]));

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 25,
        });

        doc.save(`${title.toLowerCase().replace(/\s/g, '_')}.pdf`);
    }
};
