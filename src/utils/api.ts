import axios from "axios";
import {RoomType} from "../models/RoomType";
import {Status, StatusResponse, mapStatusResponse, RoomStatus} from "../models/Status";


const axiosInstance = axios.create({
  baseURL: window.appConfig.apiAddress || '',
})

interface HistoryParams {
  room: RoomType
  limit: number;
}

export const getLatestStatus = async (): Promise<Status> => {
  try {
    const {data} = await axiosInstance.get<StatusResponse>('/status');
    return mapStatusResponse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getHistoryStatuses = async (params: HistoryParams): Promise<RoomStatus[]> => {
  try {
    const {data} = await axiosInstance.get<RoomStatus[]>('/status', {params});
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
