import api from "@/lib/axios";

export const invoiceService = {
  getInvoices() {
    return api.get("/invoices");
  },
};