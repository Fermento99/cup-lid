export type StatusResponse = {
  time: string,
  heating: boolean,
  bathroom_temperature: number,
  bedroom_temperature: number,
  livingroom_temperature: number,
  pawel_temperature: number,
  michal_temperature: number,
  bathroom_heating: boolean,
  bedroom_heating: boolean,
  livingroom_heating: boolean,
  pawel_heating: boolean,
  michal_heating: boolean,
}

export type Status = {
  time: string,
  heating: boolean,
  bathroomTemperature: number,
  bedroomTemperature: number,
  livingroomTemperature: number,
  pawelTemperature: number,
  michalTemperature: number,
  bathroomHeating: boolean,
  bedroomHeating: boolean,
  livingroomHeating: boolean,
  pawelHeating: boolean,
  michalHeating: boolean,
}

export const mapStatusResponse = (response: StatusResponse): Status => ({
  time: response.time,
  heating: response.heating,
  bathroomTemperature: response.bathroom_temperature,
  bedroomTemperature: response.bedroom_temperature,
  livingroomTemperature: response.livingroom_temperature,
  pawelTemperature: response.pawel_temperature,
  michalTemperature: response.michal_temperature,
  bathroomHeating: response.bathroom_heating,
  bedroomHeating: response.bedroom_heating,
  livingroomHeating: response.livingroom_heating,
  pawelHeating: response.pawel_heating,
  michalHeating: response.michal_heating,
});

export type RoomStatus = {
  time: string,
  temperature: number,
  heating: boolean,
}
