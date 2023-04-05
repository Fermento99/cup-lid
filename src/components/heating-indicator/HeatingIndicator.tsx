type HeatingStatusProps = {
  status: boolean,
}

export const HeatingIndicator = ({status}: HeatingStatusProps) => {
  return (
    <div>
      Heating: {status ? "ON" : "OFF"}
    </div>
  );
}