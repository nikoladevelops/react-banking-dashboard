import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export interface User {
  id: string;
  username: string;
  email: string;
  egn: string;
  identityDoc?: string;
  fullNameCyrillic: string;
  fullNameLatin: string;
  isBlocked: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useUserById = (id: string) => {
  return useQuery<User>({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await api.get(`/users/${id}`);
      return res.data.data as User;
    },
    enabled: !!id,
  });
};
