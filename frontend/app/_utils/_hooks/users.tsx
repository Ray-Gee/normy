import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listUsers,
  createWrapper,
  createUser,
  updateUser,
  deleteUser,
  deleteWrapper,
  createDataItem,
} from "@/_services/userService";
import { verifyToken } from "@/_services/authService";
import type {
  NewUser,
  ExistingUser,
  UseUserProps,
  UseUpdateUserProps,
  UseDeleteUserProps,
  ResultProps,
  LoginProps,
} from "@/definitions";
import { AxiosResponse } from "axios";

export const useListUsers = ({ backendName }: { backendName: String }) => {
  return useQuery<AxiosResponse<any, any>, Error>({
    queryKey: ["users", backendName],
    queryFn: () => listUsers(),
  });
};

export const useCreateUser = ({
  items,
  setItems,
  onSuccess,
  onError,
}: UseUserProps) => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ values }: { values: NewUser }) => {
    return createWrapper<ExistingUser, NewUser>({
      items,
      setItems,
      values,
      createData: createUser,
    });
  };

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onSuccess();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};

export const useCreateSignupUser = ({ onSuccess, onError }: ResultProps) => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ values }: { values: NewUser }) => {
    return createDataItem<ExistingUser, NewUser>({
      values,
      createData: createUser,
    });
  };
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onSuccess();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};

export const useUpdateUser = ({
  user,
  onError,
  onSuccess,
}: UseUpdateUserProps) => {
  const queryClient = useQueryClient();

  const mutationFn = async (values: { name: string; email: string }) => {
    return updateUser(user.id, {
      name: values.name,
      email: values.email,
    });
  };

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onSuccess();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};

export const useDeleteUser = ({
  items,
  setItems,
  onSuccess,
  onError,
}: UseDeleteUserProps) => {
  const queryClient = useQueryClient();

  const mutationFn = async (userId: string) => {
    const user = items.find((u) => u.id === userId);
    if (user) {
      return deleteWrapper({
        item: user,
        items,
        setItems,
        deleteData: deleteUser,
      });
    }
  };

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onSuccess();
    },
    onError: (error: Error) => {
      onError(error);
    },
  });
};

type UseVerifyTokenProps = {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export const useVerifyToken = ({ onSuccess, onError }: UseVerifyTokenProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["token"],
    mutationFn: async (values: LoginProps) => {
      return verifyToken(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["token"],
      });
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  });
};
