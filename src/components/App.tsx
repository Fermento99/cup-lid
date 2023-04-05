import {useEffect, useState} from "react";
import {Clock} from "./clock/Clock";
import {HeatingIndicator} from "./heating-indicator/HeatingIndicator";
import {RoomType} from "../models/RoomType";
import {RoomTile} from "./room-tile/RoomTile";
import {TemperatureGraph} from "./temperature-graph/TemperatureGraph";
import {Status} from "../models/Status";
import {getLatestStatus} from "../utils/api";

export const App = () => {
  const [selectedRoom, selectRoom] = useState<RoomType|undefined>(undefined);
  const [latestStatus, setLatestStatus] = useState<Status|undefined>(undefined);
  const [{loading, errorMessage}, setLoadingStatus] = useState({loading: true, errorMessage: ''})
  const rooms: RoomType[] = ['bedroom', "bathroom", "livingroom", "pawel", "michal"];

  useEffect(() => {
    setLoadingStatus({loading: true, errorMessage: ''})
    getLatestStatus().then(data => {
      setLatestStatus(data);
      setLoadingStatus({loading: false, errorMessage: ''});
    }).catch(error => setLoadingStatus({loading: false, errorMessage: (error as Error).message}))
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (errorMessage) return <h1>{errorMessage}</h1>

  return (
    <div className="App">
      <Clock updateTime={latestStatus!.time} />
      <HeatingIndicator status={latestStatus!.heating} />
      { rooms.map((room, index) => (
        <RoomTile
          name={room}
          key={index}
          temperature={latestStatus![`${room}Temperature`]}
          heating={latestStatus![`${room}Heating`]}
          selectedCallback={() => selectRoom(room)}
        />
      ))}
      <TemperatureGraph selectedRoom={selectedRoom}/>
    </div>
  );
}
