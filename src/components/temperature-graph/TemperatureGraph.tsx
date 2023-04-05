import { FormEvent, useCallback, useEffect, useState} from "react";
import {getHistoryStatuses} from "../../utils/api";
import {RoomType} from "../../models/RoomType";
import {RoomStatus} from "../../models/Status";

type TemperatureGraphParams = {
  selectedRoom: RoomType | undefined,
}

export const TemperatureGraph = ({selectedRoom}:TemperatureGraphParams) => {
  const [{ loading, errorMessage }, setLoadingStatus] = useState({loading: true, errorMessage: ''})
  const [statusHistory, setStatusHistory] = useState<RoomStatus[]>([])
  const [historyLimit, setHistoryLimit] = useState(24);
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const { limit } = event.target as typeof event.target & {
      limit: { value: string },
    };
    const limitValue = parseInt(limit.value)
    if (limitValue > 0) setHistoryLimit(limitValue)
  }, [])

  useEffect(() => {
    if (selectedRoom) {
      setLoadingStatus({loading: true, errorMessage: ''});
      getHistoryStatuses({room: selectedRoom, limit: historyLimit > 0 ? historyLimit : 1}).then(data => {
        setStatusHistory(data);
        setLoadingStatus({loading: false, errorMessage: ''})
      }).catch(error => setLoadingStatus({ loading: false, errorMessage: (error as Error).message }))
    }
  }, [selectedRoom, historyLimit]);

  if (!selectedRoom) return null;
  if (loading) return <h1>Loading...</h1>;
  if (errorMessage) return <h1>{errorMessage}</h1>;

  return <div>
    <form onSubmit={handleSubmit}>
      <input
        type='number'
        name='limit'
        min="1"
        defaultValue={historyLimit}
      />
      <button type='submit'>Change limit</button>
    </form>

    <table>
      <thead>
        <tr>
          <td>Room</td>
          <td>Temperature</td>
          <td>Heating</td>
        </tr>
      </thead>
      <tbody>
      {statusHistory.map(({time, temperature, heating}) => (
        <tr key={`${selectedRoom} ${time}`}>
          <td>{new Date(time).toLocaleString()}</td>
          <td>{temperature}°C</td>
          <td>{heating ? 'ON' : 'OFF'}</td>
        </tr>
      ))}
      {statusHistory.length === 0 && <tr><td>--</td><td>--</td><td>--</td></tr>}
      </tbody>
    </table>
  </div>;
};
