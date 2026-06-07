import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useUserByUsername = (username: string) => {
  return useQuery<User>({
    queryKey: ["users", "username", username],
    queryFn: async () => {
      const res = await api.get(`/users/username/${username}`);
      return res.data.data as User;
    },
    enabled: !!username,
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      const res = await api.patch(`/users/block/${username}`);
      return res.data.data as User;
    },
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({
        queryKey: ["users", "username", username],
      });
    },
  });
};

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      const res = await api.patch(`/users/unblock/${username}`);
      return res.data.data as User;
    },
    onSuccess: (_, username) => {
      queryClient.invalidateQueries({
        queryKey: ["users", "username", username],
      });
    },
  });
};
