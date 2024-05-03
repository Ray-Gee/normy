import { listUsers } from "@/_services/userService";
import { useQuery } from "@tanstack/react-query";
import type { ExistingUser } from "@/definitions";

export const useListUsers = ({ backendName }: { backendName: String }) => {
  return useQuery<ExistingUser[], Error>({
    queryKey: ["users", backendName],
    queryFn: () => listUsers(),
  });
};
