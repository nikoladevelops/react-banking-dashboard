import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export interface Account {
  id: string;
  accountNumber: string;
  name: string;
  type: string;
  currency: string;
  balance: number; // in cents
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export const useAccounts = (limit: number = 5, offset: number = 0) => {
  return useQuery({
    queryKey: ["accounts", { limit, offset }],
    queryFn: async () => {
      const res = await api.get(`/accounts?limit=${limit}&offset=${offset}`);
      return res.data.data as Account[];
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      type: string;
      currency: string;
      initialDeposit?: number;
    }) => api.post("/accounts", data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: { name?: string; status?: string };
    }) => api.patch(`/accounts/${id}`, updates).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/accounts/${id}`).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
