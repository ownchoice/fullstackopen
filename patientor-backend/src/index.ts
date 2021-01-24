import express from 'express';
import cors from 'cors';
// import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

// app.use('/api/patients', patientRouter);
app.get('/api/patients', (_req, res) => {
  console.log('someone pinged here');
  res.json([{
    id: 'id 1',
    name: 'name 1',
    occupation: 'occupation 1',
    gender: 'male',
  }]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});