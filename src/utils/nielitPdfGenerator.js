import { jsPDF } from 'jspdf';

/**
 * Creates and returns a 4-page jsPDF document for NIELIT Project Submission
 * @param {Object} data Candidate, project, guide, and payment details
 * @returns {jsPDF|null}
 */
export function createNielitProjectPdfDoc(data) {
  if (!data) return null;

  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    const candName = (data.candidateName || 'Candidate Name').toUpperCase();
    const fatherName = data.fatherName || 'Father Name';
    const regNo = data.nielitRegNo || '1536056';
    const level = data.nielitLevel || 'A';
    const projectTitle = data.projectTitle || 'Network Monitoring and Management';
    const guideName = data.guideName || 'Sushil Kumar';
    const guideDesignation = data.guideDesignation || 'Sr. Laravel Developer';
    const guideQualification = data.guideQualification || 'MCA';
    const guidePlace = data.guidePlace || 'Prayagraj';
    const guideAddress = data.guideAddress || 'Prayagraj Uttar Pradesh';
    const projectDate = data.projectDate || new Date().toLocaleDateString('en-GB');

    const residentialAddress = data.address || 'Buhana Jhunjhunu';
    const district = data.district || 'Jhunjhunu';
    const state = data.state || 'Rajasthan';
    const pin = data.pin || '333502';
    const mobile = data.mobile || '7740854811';
    const email = (data.email || 'praveensoni11@gmail.com').toUpperCase();

    const paymentDate = data.paymentDate || '25-Mar-2026';
    const utrNumber = data.utrNumber || 'CHD550W1FMSF1B';
    const accountHolderName = data.accountHolderName || data.candidateName || 'Praveen Kumar Soni';
    const amount = data.amount || '1000';
    const remark = data.paymentRemark || 'Paid';

    // =========================================================================
    // PAGE 1: ANNEXURE – II (PERFORMA FOR A / B / C Level PROJECT CERTIFICATE)
    // =========================================================================

    // Top Right Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Annexure – II', pageWidth - margin, 20, { align: 'right' });

    // Main Title Section
    let curY = 32;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PERFORMA FOR A / B / C Level PROJECT CERTIFICATE', pageWidth / 2, curY, { align: 'center' });
    curY += 7;
    doc.text('FROM PROJECT GUIDE /ACCREDITED INSTITUTE', pageWidth / 2, curY, { align: 'center' });
    curY += 7;
    doc.setFontSize(10);
    doc.text('[For Direct as well as candidate from Accredited Institute]', pageWidth / 2, curY, { align: 'center' });

    // Certificate Paragraph
    curY += 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    
    const p1Lines = doc.splitTextToSize(
      `This is to certify that the Project / Dissertation entitled "${projectTitle}" a bonafide work done by Mr. / Ms. ${candName} (NIELIT Registration No: ${regNo}) in partial fulfilment of ${level} Level / B Level / C Level examination and has been carried out under my direct supervision and guidance. This report or a similar report on the topic has not been submitted for any other examination and does not form a part of any other course undergone by the candidate.`,
      contentWidth
    );

    doc.text(p1Lines, margin, curY);
    curY += (p1Lines.length * 6) + 12;

    // Signature Line
    doc.text('_______________________', margin, curY);
    curY += 7;
    doc.setFont('helvetica', 'normal');
    doc.text('Signature of Guide / Supervisor', margin, curY);

    curY += 12;
    doc.setFont('helvetica', 'bold');
    doc.text(`Name: ${guideName}`, margin, curY);

    curY += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Place: ${guidePlace}`, margin, curY);

    curY += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Designation: ${guideDesignation}`, margin, curY);

    curY += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${projectDate}`, margin, curY);

    curY += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Address: ${guideAddress}`, margin, curY);

    curY += 14;
    doc.setFont('helvetica', 'bold');
    doc.text('Signature of Center Manager', margin, curY);
    curY += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('[in case of a candidate from Accredited Institute]', margin, curY);


    // =========================================================================
    // PAGE 2: ANNEXURE – III (PERFORMA OF COVERING LETTER TO THE PROJECT REPORT)
    // =========================================================================
    doc.addPage();

    // Top Right Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Annexure- |||', pageWidth - margin, 20, { align: 'right' });

    // Main Title Section
    curY = 30;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PERFORMA OF COVERING LETTER TO THE PROJECT REPORT', pageWidth / 2, curY, { align: 'center' });
    
    // Underline header
    const titleWidth = doc.getTextWidth('PERFORMA OF COVERING LETTER TO THE PROJECT REPORT');
    doc.setLineWidth(0.4);
    doc.line((pageWidth / 2) - (titleWidth / 2), curY + 1, (pageWidth / 2) + (titleWidth / 2), curY + 1);

    // Recipient Address
    curY += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text('Controller of Examinations,', margin, curY);
    curY += 6;
    doc.text('NIELIT,', margin, curY);
    curY += 6;
    doc.text('PlotNo.3,PSP Pocket', margin, curY);
    curY += 6;
    doc.text('Dwarka, Sector-8', margin, curY);
    curY += 6;
    doc.text('New Delhi – 110077', margin, curY);

    // Letter Body
    curY += 12;
    doc.text('Sir,', margin, curY);
    curY += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`I am submitting my ${level} level Project for evaluation. Details of my Registration and postal address, etc is as under:`, margin, curY);

    curY += 12;
    doc.setFont('helvetica', 'bold');
    doc.text(`Regn.No: ${regNo}`, margin, curY);
    curY += 8;
    doc.text(`Level - ${level}`, margin, curY);

    curY += 10;
    doc.text(`Name: Mr. ${candName}`, margin, curY);

    curY += 10;
    doc.text(`Father’s Name: Mr. ${fatherName}`, margin, curY);

    curY += 10;
    doc.text('Address:', margin, curY);

    curY += 8;
    doc.text(`(a)Residential Address :- ${residentialAddress}`, margin, curY);

    curY += 8;
    doc.text(`District:- ${district},`, margin, curY);

    curY += 8;
    doc.text(`State:- ${state}, Pin:- ${pin}`, margin, curY);

    curY += 10;
    doc.text(`Mob No: ${mobile}`, margin, curY);

    curY += 8;
    doc.text('Tele No: __________________________________________________', margin, curY);
    curY += 5;
    doc.setFontSize(9);
    doc.text('(Country code) (City code) (Telephone number)', margin + 20, curY);

    curY += 10;
    doc.setFontSize(10.5);
    doc.text('(b) Office Address:', margin, curY);
    curY += 6;
    doc.text('__________________________________________________', margin, curY);

    curY += 8;
    doc.text('Tele No: __________________________________________________', margin, curY);
    curY += 5;
    doc.setFontSize(9);
    doc.text('(Country code) (City code) (Telephone number)', margin + 20, curY);

    curY += 8;
    doc.setFontSize(10.5);
    doc.text('Fax: __________________________________________________', margin, curY);
    curY += 5;
    doc.setFontSize(9);
    doc.text('(Country code) (City code) (Telephone number)', margin + 20, curY);

    curY += 10;
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.text('E-mail Address (Please in block letters only): ', margin, curY);
    doc.setTextColor(0, 0, 255);
    doc.text(email, margin + 82, curY);
    doc.setTextColor(0, 0, 0);


    // =========================================================================
    // PAGE 3: PROFORMA OF THE PROJECT COMPLETION CERTIFICATE
    // =========================================================================
    doc.addPage();

    curY = 25;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Proforma of the Project Completion Certificate', pageWidth / 2, curY, { align: 'center' });

    // Underline
    const page3TitleW = doc.getTextWidth('Proforma of the Project Completion Certificate');
    doc.line((pageWidth / 2) - (page3TitleW / 2), curY + 1, (pageWidth / 2) + (page3TitleW / 2), curY + 1);

    curY += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const p3Body1 = doc.splitTextToSize(
      `This is to certify that the Project work done at "${projectTitle}" By Mr./Ms. ${candName}(NIELIT Registration No.${regNo}) in partial fulfillment of NIELIT '${level}' Level Examination has been found satisfactory. This report has not been submitted for any other examination and does not form part of any other course undergone by the candidate.`,
      contentWidth
    );
    doc.text(p3Body1, margin, curY);
    curY += (p3Body1.length * 5.5) + 6;

    const p3Body2 = doc.splitTextToSize(
      `It is further certifies that he/she has appeared in all the four modules of NIELIT '${level}' level Examination.`,
      contentWidth
    );
    doc.text(p3Body2, margin, curY);
    curY += (p3Body2.length * 5.5) + 12;

    doc.setFont('helvetica', 'normal');
    doc.text('Signature', margin, curY);
    curY += 8;

    doc.text('Name:', margin, curY);
    curY += 6;
    doc.text('(Institute PROV No./FULL No.) (or)', margin, curY);
    curY += 6;
    doc.text('Head of the Organization/Division:', margin, curY);
    curY += 6;
    doc.text('Name of the Organization:', margin, curY);
    curY += 6;
    doc.text('Address:', margin, curY);
    curY += 6;
    doc.text('(or)', margin, curY);
    curY += 6;
    
    doc.setFont('helvetica', 'bold');
    doc.text(`Name of the Guide/Supervisor: ${guideName}`, margin, curY);
    curY += 6;
    doc.text(`Qualification: ${guideQualification}`, margin, curY);
    curY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('(Self attested copy of the qualification of the guide/Supervisor to be attached)', margin, curY);

    // Fees Details Table Section
    curY += 16;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Fees Details: -', margin, curY);

    curY += 8;
    const tableX = margin;
    const colWidthsP3 = [50, 60, 60];
    const rowH = 8;

    // Table Header
    doc.setLineWidth(0.3);
    doc.setDrawColor(0, 0, 0);
    doc.rect(tableX, curY, contentWidth, rowH);

    let cellX = tableX;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    
    doc.text('Payment Date', cellX + 3, curY + 5.5);
    cellX += colWidthsP3[0];
    doc.line(cellX, curY, cellX, curY + (rowH * 2));

    doc.text('UTR Number', cellX + 3, curY + 5.5);
    cellX += colWidthsP3[1];
    doc.line(cellX, curY, cellX, curY + (rowH * 2));

    doc.text('Account Holder Name', cellX + 3, curY + 5.5);

    // Table Data Row
    curY += rowH;
    doc.rect(tableX, curY, contentWidth, rowH);

    cellX = tableX;
    doc.setFont('helvetica', 'normal');
    doc.text(paymentDate, cellX + 3, curY + 5.5);

    cellX += colWidthsP3[0];
    doc.text(utrNumber, cellX + 3, curY + 5.5);

    cellX += colWidthsP3[1];
    doc.text(accountHolderName, cellX + 3, curY + 5.5);


    // =========================================================================
    // PAGE 4: O/A/B/C Project Fee Details Table
    // =========================================================================
    doc.addPage('a4', 'landscape');

    const landWidth = 297;
    const landMargin = 15;
    const landContentW = landWidth - (landMargin * 2);

    let landY = 25;

    // Table Container
    doc.setLineWidth(0.4);
    doc.setDrawColor(0, 0, 0);

    const tblW = landContentW;
    const r1H = 10;
    const r2H = 10;
    const r3H = 12;
    const r4H = 12;
    const totalTblH = r1H + r2H + r3H + r4H;

    doc.rect(landMargin, landY, tblW, totalTblH);

    // Row 1: Header Title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('O/A/B/C Project Fee Details', landWidth / 2, landY + 6.5, { align: 'center' });
    doc.line(landMargin, landY + r1H, landMargin + tblW, landY + r1H);

    // Row 2: Subtitle
    landY += r1H;
    doc.text('NIELIT HQ,NEW DELHI', landWidth / 2, landY + 6.5, { align: 'center' });
    doc.line(landMargin, landY + r2H, landMargin + tblW, landY + r2H);

    // Row 3 & 4 Columns Grid Calculation
    landY += r2H;

    // Candidate Details spans: S.No (14), Regn No (26), Name of Cand (55), Level (16) = 111mm
    // Payment Details spans: Amount (20), Transaction Date (36), Transaction No/UTR (52), Payment Sender Name (42), Remark (21) = 171mm
    const colWList = [14, 26, 55, 16, 20, 36, 52, 42, 21];
    const candidateSectionW = colWList[0] + colWList[1] + colWList[2] + colWList[3]; // 111mm

    // Row 3 Header Text
    doc.text('Candidate Details', landMargin + (candidateSectionW / 2), landY + 7.5, { align: 'center' });
    doc.line(landMargin + candidateSectionW, landY, landMargin + candidateSectionW, landY + r3H + r4H);

    doc.text('Payment Details', landMargin + candidateSectionW + ((tblW - candidateSectionW) / 2), landY + 7.5, { align: 'center' });
    doc.line(landMargin, landY + r3H, landMargin + tblW, landY + r3H);

    // Row 4 Column Headers
    landY += r3H;
    doc.setFontSize(9.5);

    const headers = [
      'S. No.', 'Regn. No.', 'Name of Cand.', 'Level', 
      'Amount', 'Transaction Date', 'Transaction No/UTR', 'Payment Sender Name', 'Remark'
    ];

    let currX = landMargin;
    for (let i = 0; i < headers.length; i++) {
      const w = colWList[i];
      if (i > 0) {
        doc.line(currX, landY, currX, landY + r4H);
      }
      
      doc.text(headers[i], currX + (w / 2), landY + 7.5, { align: 'center' });
      currX += w;
    }
    doc.line(landMargin, landY + r4H, landMargin + tblW, landY + r4H);

    // Row 5 Data Values
    landY += r4H;
    const rowValues = [
      '1.',
      regNo,
      `Mr. ${candName}`,
      level,
      amount,
      paymentDate,
      utrNumber,
      accountHolderName,
      remark
    ];

    currX = landMargin;
    for (let i = 0; i < rowValues.length; i++) {
      const w = colWList[i];
      if (i > 0) {
        doc.line(currX, landY, currX, landY + r4H);
      }
      doc.text(String(rowValues[i]), currX + (w / 2), landY + 7.5, { align: 'center' });
      currX += w;
    }

    return doc;
  } catch (err) {
    console.error('Error generating NIELIT 4-Page PDF Document:', err);
    return null;
  }
}

/**
 * Returns a Blob of the 4-Page NIELIT Project PDF
 * @param {Object} data 
 * @returns {Blob|null}
 */
export function getNielitProjectPdfBlob(data) {
  const doc = createNielitProjectPdfDoc(data);
  if (!doc) return null;
  return doc.output('blob');
}

/**
 * Generates and downloads the 4-Page NIELIT Project Submission PDF
 * @param {Object} data 
 */
export function generateNielitProjectPdf(data) {
  if (!data) return false;
  try {
    const doc = createNielitProjectPdfDoc(data);
    if (!doc) return false;

    const candCleanName = (data.candidateName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `NIELIT_Project_Submission_${data.nielitRegNo || 'Form'}_${candCleanName}.pdf`;

    const blobUrl = doc.output('bloburl');
    window.open(blobUrl, '_blank');
    doc.save(filename);
    return true;
  } catch (err) {
    console.error('Error opening NIELIT PDF:', err);
    return false;
  }
}

export default {
  createNielitProjectPdfDoc,
  getNielitProjectPdfBlob,
  generateNielitProjectPdf
};
