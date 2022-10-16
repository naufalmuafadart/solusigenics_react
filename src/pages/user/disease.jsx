import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import outletInit from '../../js/components/pages/outlet';
import DiseaseClass from '../../components/pages/Disease';

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
  // useEffect(() => {
  //   outletInit('diseaseOutlet');
  // });
  const disease = useLoaderData();
  return (
    <DiseaseClass disease={disease} />
  );
}
