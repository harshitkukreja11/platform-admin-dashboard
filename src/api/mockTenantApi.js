import axios from "axios";

const tenants = [
  { id: 1, name: "Tenant A", users: 12, stores: 3, status: "Active", location: "Dubai" },
  { id: 2, name: "Tenant B", users: 8, stores: 2, status: "Active", location: "Abu Dhabi" },
  { id: 3, name: "Tenant C", users: 20, stores: 6, status: "Inactive", location: "Sharjah" },
  { id: 4, name: "Tenant D", users: 5, stores: 1, status: "Pending", location: "Ajman" },
  { id: 5, name: "Tenant E", users: 17, stores: 4, status: "Active", location: "Ras Al Khaimah" },
];

export const getTenants = async () => {
  const response = await axios.get("/mock/tenants", {
    adapter: async (config) => {
      return {
        data: tenants,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      };
    },
  });

  return response.data;
};

export const getTenantById = async (id) => {
  const response = await axios.get(`/mock/tenants/${id}`, {
    adapter: async (config) => {
      const tenant = tenants.find((item) => item.id === Number(id));

      return {
        data: tenant || null,
        status: tenant ? 200 : 404,
        statusText: tenant ? "OK" : "Not Found",
        headers: {},
        config,
      };
    },
  });

  return response.data;
};