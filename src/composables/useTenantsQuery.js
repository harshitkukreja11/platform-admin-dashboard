import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getTenants } from "../api/mockTenantApi";

export function useTenantsQuery() {
  const query = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });

  const tenants = computed(() => query.data.value ?? []);

  return {
    tenants,
    ...query,
  };
}