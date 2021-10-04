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
  const [{ patients }, _dispatch] = useStateValue();

  const patient: Patient | undefined = patients[id];
  if (patient) {
    console.log(patient.gender);
    console.log(typeof patient.gender);
  }
  return (
    <div className="App">
      {patient && (
        <>
          <Container>
            <h3>
              {patient.name}{" "}
              {patient.gender === Gender.Male ? (
                <Icon name="man" aria-label="Gender: male" />
              ) : patient.gender === Gender.Female ? (
                <Icon name="woman" aria-label="Gender: female" />
              ) : (
                <Icon name="other gender" aria-label="Gender: other" />
              )}
            </h3>
          </Container>
          <ul>
            <li>Occupation: {patient.occupation}</li>
            <li>Date of birth: {patient.dateOfBirth}</li>
            <li>ID: {patient.id}</li>
          </ul>
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
