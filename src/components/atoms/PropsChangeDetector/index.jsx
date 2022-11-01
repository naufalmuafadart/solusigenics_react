import { useEffect } from "react";

const PropsChangeDetector = (props) => {
  const { props_item, state_item, date, onPropsChange } = props;
  useEffect(() => {
    const checkPropsChange = async () => {
      if (props_item != state_item) {
        await onPropsChange();
      }
    };
    checkPropsChange();
  }, [
    props_item,
    state_item,
    date,
  ]);
  return (null);
};

export default PropsChangeDetector;
