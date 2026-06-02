import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export interface Transaction {
  id: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number; // in cents
  currency: string;
  status: string;
  transactionDate: string;
  executedBy: string;
  createdAt: string;
  updatedAt: string;
  reference?: string;
  approvedBy?: string;
}

export const useTransactions = (limit: number = 5, offset: number = 0) => {
  return useQuery({
    queryKey: ["transactions", { limit, offset }],
    queryFn: async () => {
      const res = await api.get(
        `/transactions?limit=${limit}&offset=${offset}`,
      );
      return res.data.data as Transaction[];
    },
  });
};

export const useTransactionById = (id: string) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      const res = await api.get(`/transactions/${id}`);
      return res.data.data as Transaction;
    },
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      fromAccountNumber: string;
      toAccountNumber: string;
      amount: number;
      currency: string;
      reference?: string;
    }) => api.post("/transactions", data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
