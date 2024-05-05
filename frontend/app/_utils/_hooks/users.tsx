import { listUsers } from "@/_services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWrapper,
  createUser,
  updateUser,
  deleteUser,
  deleteWrapper,
  createDataItem,
} from "@/_services/userService";
import type {
  NewUser,
  ExistingUser,
  UseUserProps,
  UseUpdateUserProps,
  UseDeleteUserProps,
  ResultProps,
} from "@/definitions";

export const useListUsers = ({ backendName }: { backendName: String }) => {
  return useQuery<ExistingUser[], Error>({
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