
// This assumes jspdf and html2canvas are loaded from a CDN as specified in index.html
declare const jspdf: any;
declare const html2canvas: any;

export const generatePdf = async () => {
  const resumeElement = document.getElementById('resume-content');
  if (!resumeElement) {
    console.error('Resume content element not found');
    return;
  }

  try {
    const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: window.getComputedStyle(document.body).backgroundColor, // Match the theme background
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in points: 595.28 x 841.89
    const pdf = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;
    const pdfAspectRatio = pdfWidth / pdfHeight;

    let finalCanvasWidth, finalCanvasHeight;

    // Scale image to fit width of PDF
    finalCanvasWidth = pdfWidth;
    finalCanvasHeight = finalCanvasWidth / canvasAspectRatio;

    pdf.addImage(imgData, 'PNG', 0, 0, finalCanvasWidth, finalCanvasHeight);
    pdf.save('resume.pdf');

  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
