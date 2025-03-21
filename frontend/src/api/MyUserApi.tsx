import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueries } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const UserCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest): Promise<any> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    const data = await response.json();
    return data;
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: createMyUserRequest });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  address: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (
    formData: UpdateMyUserRequest
  ): Promise<any> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return data;
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isPending };
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ["fetchCurrentUser"],
        queryFn: getMyUserRequest,
      },
    ],
  });

  const { data: currentUser, isPending, error } = queries[0];

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isPending };
};
