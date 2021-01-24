import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  // res.send('Fetching all diaries!');
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, occupation, gender, ssn, dateOfBirth } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient = patientService.addPatient({name, occupation, gender, ssn, dateOfBirth});
  res.json(newPatient);
});


export default router;