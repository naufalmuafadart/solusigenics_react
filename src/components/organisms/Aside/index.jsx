import React from "react";
import Button from "./button";

import buttonsData from "./data";

import '../../../css/component/organisms/aside.css';

function buttonMapping(button, selectedOrder, onAsideButtonClicked) {
  if (button.order === selectedOrder) {
    return (
      <Button
        disease={button.name}
        key={button.order}
        order={button.order}
        active={true}
        onAsideButtonClicked={onAsideButtonClicked}
        />
    );
  }
  return (
    <Button
      disease={button.name}
      key={button.order}
      order={button.order}
      active={false}
      onAsideButtonClicked={onAsideButtonClicked}
      />
  );
}

export default function Aside({ selectedDiseaseOrder, onAsideButtonClicked }) {
  return (
    <aside>
      <div id="asideContentWrapper">
        <h2>Jenis Penyakit</h2>
        <div id="buttonWrapper">
          {
            buttonsData.map(
              (button) => buttonMapping(button, selectedDiseaseOrder, onAsideButtonClicked)
            )
          }
        </div>
      </div>
    </aside>
  );
}
