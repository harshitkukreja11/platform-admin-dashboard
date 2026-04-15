import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getTenantById } from "../api/mockTenantApi";

export function useTenantQuery(id) {
  const query = useQuery({
    queryKey: ["tenant", id],
    queryFn: () => getTenantById(id),
    enabled: !!id,
  });

  const tenant = computed(() => query.data.value ?? null);

  return {
    tenant,
    ...query,
  };
}