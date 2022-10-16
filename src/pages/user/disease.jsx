import React from 'react';
import { useLoaderData } from 'react-router-dom';

import DiseaseClass from '../../components/organisms/Disease';
import '../../css/pages/user/disease.css';

export const tipesLoader = () => {
  return 'Tipes'
};

export const ususBuntuLoader = () => {
  return 'Usus Buntu';
};

export const loader = ({ params }) => {
  let disease = params.disease;
  if (disease === "UsusBuntu") {
    disease = "Usus Buntu";
  }
  else if (disease === "DemamBerdarah") {
    disease = "Demam Berdarah";
  }
  return disease;
}

export const Disease = () => {
  const disease = useLoaderData();
  return (
    <DiseaseClass disease={disease} />
  );
}
