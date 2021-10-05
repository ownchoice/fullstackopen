import React from "react";
import { useParams } from "react-router";
import { Container, Icon, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient, Gender, EntryWithoutId } from "../types";
import PatientEntries from "../components/PatientEntries";
import AddEntryModal from "../AddEntryModal";
import { fetchPatientList } from "../App";
import { apiBaseUrl } from "../constants";
import axios from "axios";

interface Props {
  id: string;
}

const index = () => {
  const { id } = useParams<Props>();
  const [{ patients }, dispatch] = useStateValue();

  const patient: Patient | undefined = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      void (await axios.post<EntryWithoutId>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      ));
      console.log("test1");
      void fetchPatientList(dispatch);
      console.log("test2");
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

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
                <h3>Entries ({patient.entries.length})</h3>
                <PatientEntries entries={patient.entries} />
              </>
            ) : (
              <h3>No entries found</h3>
            ))}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <div style={{ paddingBottom: "3rem", paddingTop: "3rem" }}>
            <Button onClick={() => openModal()}>Add new entry</Button>
          </div>
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
