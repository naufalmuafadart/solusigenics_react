import React from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

import DiseaseClass from '../../components/pages/Disease';

export const loader = ({ params }) => {
  let disease = params.disease;
  if (disease === "UsusBuntu") {
    disease = "Usus Buntu";
  }
  else if (disease === "DemamBerdarah") {
    disease = "Demam Berdarah";
  }
  let order = 0;
  switch(disease) {
    case 'Tipes':
      order = 1;
      break;
    case 'Covid':
      order = 2;
      break;
    case 'Diare':
      order = 3;
      break;
    case 'Usus Buntu':
      order = 4;
      break;
    case 'Diabetes':
      order = 5;
      break;
    case 'TBC':
      order = 6;
      break;
    case 'Hipertensi':
      order = 7;
      break;
    case 'Demam Berdarah':
      order = 8;
      break;
    default:
      order = 0;
  }
  return { disease, order };
}

export const Disease = () => {
  const { disease, order } = useLoaderData();
  const { onAsideButtonClicked, onOutletChange } = useOutletContext();
  return (
    <DiseaseClass
      disease={disease}
      order={order}
      onAsideButtonClicked={onAsideButtonClicked}
      onOutletChange={onOutletChange}
      />
  );
}
