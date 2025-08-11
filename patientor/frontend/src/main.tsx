// src/main.tsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { Patient } from "./types";
import patientService from "./services/patients";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    patientService.getAll().then(data => setPatients(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
        <Route path="/patients/:id" element={<PatientPage />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
