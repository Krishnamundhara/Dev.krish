import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  ArrowBack as BackIcon, 
  Edit as EditIcon,
  PictureAsPdf as PdfIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BillView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const printRef = useRef();
  
  // Get WhatsApp number from localStorage
  const whatsappNumber = localStorage.getItem('whatsappNumber') || "";

  useEffect(() => {
    try {
      // Load the bill data from localStorage (or you can use your backend if you want)
      const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
      const billToView = savedBills.find(bill => bill.id === id);
      
      if (billToView) {
        setBill(billToView);
      } else {
        setError('Bill not found');
      }
    } catch (err) {
      setError('Error loading bill data');
      console.error('Error loading bill:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Handle PDF generation and saving
  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const element = printRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Generate filename based on order number and date
      const filename = `Bill-${bill.orderNumber}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Get PDF as blob
      const pdfBlob = pdf.output('blob');
      
      // Create FormData and append file
      const formData = new FormData();
      formData.append('file', pdfBlob, filename);
      
      // Save to server
      const response = await fetch('http://localhost:5000/api/save-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save PDF');
      }

      const result = await response.json();
      console.log('PDF saved:', result);
      
      setPdfGenerated(true);
      setSnackbarOpen(true);
      setTimeout(() => setPdfGenerated(false), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(err.message || 'Error generating PDF');
    } finally {
      setLoading(false);
    }
  };

  // Handle WhatsApp sharing
  const handleWhatsAppShare = async () => {
    if (!whatsappNumber) {
      setError('Please set WhatsApp number in settings first');
      return;
    }

    try {
      setLoading(true);
      
      // Generate PDF
      const element = printRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output('blob');
      
      // Create file object for sharing
      const file = new File([pdfBlob], `Bill-${bill.orderNumber}.pdf`, {
        type: 'application/pdf'
      });

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `Bill ${bill.orderNumber}`,
            text: `Order #: ${bill.orderNumber}\nCustomer: ${bill.customer}\nProduct: ${bill.product}`
          });
          setSnackbarOpen(true);
          setPdfGenerated(true);
          setTimeout(() => setPdfGenerated(false), 3000);
        } catch (err) {
          if (err.name !== 'AbortError') {
            throw err;
          }
        }
      } else {
        // Fallback for browsers that don't support file sharing
        const whatsappURL = `https://wa.me/${whatsappNumber}`;
        window.open(whatsappURL, '_blank');
        setError('Direct file sharing is not supported in your browser. Please use the saved PDF.');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error sharing on WhatsApp:', err);
      setError('Error sharing on WhatsApp');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/dashboard/billing')}
          variant="contained"
        >
          Back to Billing
        </Button>
      </Container>
    );
  }

  if (!bill) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Bill not found
        </Alert>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/dashboard/billing')}
          variant="contained"
        >
          Back to Billing
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Action buttons and notifications */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate('/dashboard/billing')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Bill Details
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={() => navigate(`/dashboard/billing/edit/${id}`)}
            >
              Edit
            </Button>
            <Button
              startIcon={<PdfIcon />}
              variant="contained"
              sx={{ bgcolor: '#e91e63', '&:hover': { bgcolor: '#d81b60' } }}
              onClick={handleGeneratePDF}
            >
              GENERATE PDF
            </Button>
            <Button
              startIcon={<ShareIcon />}
              variant="contained"
              color="success"
              onClick={handleWhatsAppShare}
            >
              Share on WhatsApp
            </Button>
          </Stack>
        </Box>
        
        {pdfGenerated && (
          <Box sx={{ mt: 2, p: 1, bgcolor: '#e8f5e9', borderRadius: 1 }}>
            <Typography variant="body2" color="success.main">
              PDF saved successfully in public/pdf folder!
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Printable Bill Content */}
      <Paper sx={{ p: 3, background: "#fff" }} ref={printRef}>
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="error" sx={{ fontWeight: 'bold', mb: 1 }}>
            श्री गणेशाय नमः
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            {/* Replace src with your logo path if available */}
            <img src="/raju.png" alt="Logo" style={{ height: 50, marginRight: 16 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              RAJU INDUSTRIES
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            67 Hassan Bagh, Opp Hathi Sizing, Dhamankar Naka, Bhiwandi, Mob:9309531311, email id <a href="mailto:rajuind2024@gmail.com">rajuind2024@gmail.com</a>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            G.S.T. No. : 27AHFPM0511N1ZD
          </Typography>
        </Box>
        <Box sx={{ border: '1px solid #222', borderRadius: 2, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold', width: '30%' }}>Deal Confirmation</td>
                <td style={{ border: '1px solid #222', padding: 8, width: '35%' }}>order number: {bill.orderNumber}</td>
                <td style={{ border: '1px solid #222', padding: 8, width: '35%' }}>Date: {new Date(bill.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>PARTY NAME:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.customer}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>BROKER:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.broker || '-'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>MILL:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.mill || '-'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>QUALITY:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.product}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>RATE:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.rate}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>WEIGHT:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.weight || '-'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>BAGS:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.bags || '-'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #222', padding: 8, fontWeight: 'bold' }}>CONDITION:</td>
                <td colSpan={2} style={{ border: '1px solid #222', padding: 8 }}>{bill.termsAndConditions || '-'}</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="PDF saved successfully in public/pdf folder!"
      />
    </Container>
  );
};

export default BillView; 