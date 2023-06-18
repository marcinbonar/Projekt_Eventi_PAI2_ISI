import { jsPDF } from 'jspdf';
import Logo from './Logo.png';
import JsBarcode from 'jsbarcode';


const useGenerateTicket = () => {
  const generateTicket = (event: any, ticketWidth: number, ticketHeight: number) => {
    const doc = new jsPDF();

    // Ticket background
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(10, 10, ticketWidth, ticketHeight, 3, 3, 'F');

    // Ticket border
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.roundedRect(10, 10, ticketWidth, ticketHeight, 3, 3);

    // Adding logo
    const logo = new Image();
    logo.src = Logo;
    doc.addImage(logo, 'PNG', 15, 15, 20, 20);

    // Ticket title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`Bilet na ${event.title}`, ticketWidth - 14, 30, {
      align: 'right',
    });

    // Separator line
    doc.setLineWidth(0.5);
    doc.line(15, 35, ticketWidth - 5, 35);

    // Event details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data rozpoczęcia: ${event.startDate}`, 15, 50);
    doc.text(`Data zakończenia: ${event.endDate}`, 15, 60);
    doc.text(`Lokalizacja: ${event.location}`, 15, 70);
    doc.text(`Kategoria: ${event.category}`, 15, 80);

    // Payment status
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    if (
      ['PAID_ONLINE', 'PAID_OFFLINE'].includes(event.paymentStatus)
    ) {
      doc.setTextColor(0, 184, 113); // Green color
      doc.text('Oplacono', ticketWidth - 30, 90, { align: 'right' });
    } else if (event.paymentStatus === 'PENDING_OFFLINE_PAYMENT') {
      doc.setTextColor(255, 0, 0); // Red color
      doc.text('Nieoplacono', ticketWidth - 30, 90, { align: 'right' });
    }

    doc.setTextColor(0, 0, 0);

    // Barcode
    const barcodeX = ticketWidth / 2 - 25;
    const barcodeY = ticketHeight - 15;
    const barcodeWidth = 50;
    const barcodeHeight = 10;
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, event.eventId, {
      format: 'CODE128',
      displayValue: false,
    });
    const barcodeData = canvas.toDataURL('image/jpeg', 1.0);
    doc.addImage(
      barcodeData,
      'JPEG',
      barcodeX,
      barcodeY,
      barcodeWidth,
      barcodeHeight,
    );

    doc.save(`Bilet na ${event.title}.pdf`);
  };

  return { generateTicket };
};

export default useGenerateTicket;