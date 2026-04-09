import axios from "axios";

const tenantData = [
  { id: 1, name: "Tenant A", users: 12, stores: 3 },
  { id: 2, name: "Tenant B", users: 8, stores: 2 },
  { id: 3, name: "Tenant C", users: 20, stores: 6 },
  { id: 4, name: "Tenant D", users: 5, stores: 1 },
];

export const getTenants = async () => {
  await axios.get("https://example.com/mock-tenants", {
    adapter: async () => {
      return {
        data: tenantData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      };
    },
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tenantData);
    }, 500);
  });
};