import type { QuotesApiResponse } from "@/models/rates";
import api from "./api";

export const fetchRates = async (): Promise<QuotesApiResponse> => {
  const response = await api.get<QuotesApiResponse>('')
  return response.data
}
