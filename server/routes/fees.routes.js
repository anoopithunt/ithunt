import { Router } from 'express';
import { dbAdapter } from '../services/dbAdapter.js';

const router = Router();

/**
 * GET /api/fees
 */
router.get('/', async (req, res) => {
  try {
    const list = await dbAdapter.find('fees');
    res.json({ success: true, data: list, fees: list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/fees/student/:studentId
 */
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const all = await dbAdapter.find('fees');
    const studentFees = all.filter(f => 
      String(f.studentId).toLowerCase() === studentId.toLowerCase() ||
      String(f.studentName).toLowerCase().includes(studentId.toLowerCase())
    );
    res.json({ success: true, data: studentFees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/fees or POST /api/fees/record
 */
const recordFeeHandler = async (req, res) => {
  try {
    const body = req.body || {};
    const receiptNo = body.receiptNo || body.receiptNumber || `REC-${Math.floor(10000 + Math.random() * 90000)}`;

    const record = {
      ...body,
      id: receiptNo,
      receiptNo,
      receiptNumber: receiptNo,
      studentId: body.studentId || body.userId || 'STU-GEN',
      studentName: body.studentName || body.name || 'Student',
      course: body.course || body.courseName || 'IT Masterclass',
      amount: body.amount ? (String(body.amount).startsWith('₹') ? body.amount : `₹${Number(body.amount).toLocaleString('en-IN')}`) : '₹5,000',
      paymentMode: body.paymentMode || body.mode || 'Online UPI',
      status: body.status || 'Verified & Paid',
      date: body.date || new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString()
    };

    const saved = await dbAdapter.create('fees', record);
    res.status(201).json({
      success: true,
      message: 'Fee transaction recorded',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

router.post('/record', recordFeeHandler);
router.post('/', recordFeeHandler);

export default router;
