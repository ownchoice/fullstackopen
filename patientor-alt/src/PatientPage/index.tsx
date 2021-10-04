import React from "react";
import { useParams } from "react-router";
import { Container, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient, Gender } from "../types";

interface Props {
  id: string;
}

const index = () => {
  const { id } = useParams<Props>();
  const [{ patients, diagnoses }, _dispatch] = useStateValue();

  const patient: Patient | undefined = patients[id];

  console.log(typeof diagnoses);
  console.log(diagnoses);

  return (
    <div className="App">
      {patient && (
        <>
          <Container>
            <h2>
              {patient.name}{" "}
              {patient.gender === Gender.Male ? (
                <Icon name="man" aria-label="Gender: male" />
              ) : patient.gender === Gender.Female ? (
                <Icon name="woman" aria-label="Gender: female" />
              ) : (
                <Icon name="other gender" aria-label="Gender: other" />
              )}
            </h2>
          </Container>
          <ul>
            <li>Occupation: {patient.occupation}</li>
            {patient.ssn && <li>SSN: {patient.ssn}</li>}
            <li>Date of birth: {patient.dateOfBirth}</li>
            <li>ID: {patient.id}</li>
          </ul>
          {patient.entries &&
            (patient.entries.length > 0 ? (
              <>
                <h3>Entries</h3>
                <ul>
                  {patient.entries.map((entry) => (
                    <>
                      {entry.date} <em>{entry.description}</em>
                      {entry.diagnosisCodes && (
                        <ul>
                          {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>
                              {code}:{" "}
                              {diagnoses[code]
                                ? diagnoses[code].name
                                : "Name unknown"}
                            </li>
                          ))}
                        </ul>
                      )}
                      <br />
                    </>
                  ))}
                </ul>
              </>
            ) : (
              <h3>No entries found</h3>
            ))}
        </>
      )}
      {!patient && (
        <Container textAlign="center">
          <h3>Patient not found</h3>
        </Container>
      )}
    </div>
  );
};

export default index;
