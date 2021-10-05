import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import {
  useStateValue,
  setPatientList,
  setDiagnosisList,
  Action,
} from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

export const fetchPatientList = async (dispatch: React.Dispatch<Action>) => {
  try {
    const { data: patientListFromApi } = await axios.get<Patient[]>(
      `${apiBaseUrl}/patients`
    );
    dispatch(setPatientList(patientListFromApi));
  } catch (e) {
    console.error(e);
  }
};

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    void fetchPatientList(dispatch);

    // =======================================
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
    // =======================================
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientPage />
            </Route>
            <Route path="/patients">
              <PatientListPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
