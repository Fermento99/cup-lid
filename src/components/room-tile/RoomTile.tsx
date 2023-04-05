import {HeatingIndicator} from "../heating-indicator/HeatingIndicator";

type RoomTileProps = {
  name: string,
  temperature: number,
  heating: boolean,
  selectedCallback: () => void
}

export const RoomTile = ({name, temperature, heating, selectedCallback}: RoomTileProps) => {
  return (
    <div onClick={() => selectedCallback()}>
      <h4>{name}</h4>
      <h3>{temperature}°C</h3>
      <HeatingIndicator status={heating} />
    </div>
  );
}