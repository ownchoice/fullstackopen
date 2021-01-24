import express from 'express';
import diagnoseService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  // res.send('Fetching all patients!');
  res.send(diagnoseService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;