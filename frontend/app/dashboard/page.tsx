"use client";
import { useState, useEffect } from "react";
import { roomService } from "@/services/room.service";
import { tenantService } from "@/services/tenant.service";
import { Room } from "@/types/room";
import { Tenant } from "@/types/tenant";
import { Invoice } from "@/types/invoice";
import { invoiceService } from "@/services/invoice.service";
export default function DashboardPage() {
  useEffect(() => {
    async function loadData() {
      try {
        const res = await roomService.getRooms();
        setRooms(res.data);

        const tenantResponse = await tenantService.getTenants();
        setTenants(tenantResponse.data.data);
        

        const invoiceResponse = await invoiceService.getInvoices();
        setInvoices(invoiceResponse.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [])
  const [rooms, setRooms] = useState<Room[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(
    (room) => room.status === "OCCUPIED",
  ).length;

  const avilableRooms = rooms.filter(
    (room) => room.status === "AVAILABLE",
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "PENDING"
  ).length;

  const totalRevenue = invoices
  .filter((invoice) => invoice.status === "PAID")
  .reduce((sum, invoice) => sum + invoice.totalAmount, 0)
  return (
    <div className="p-8">
      <h1>Apartment Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="p-5 rounded-lg bg-gray-100">
          <h2 className="text-gray-500">Total Rooms</h2>
          <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
        </div>

        <div className="p-5 rounded-lg bg-gray-100">
          <h2 className="text-gray-500">Available Rooms</h2>
          <p className="text-2xl font-bold text-gray-900">{avilableRooms}</p>
        </div>

        <div className="p-5 rounded-lg bg-gray-100">
          <h2 className="text-gray-500">Tenant</h2>
          <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
        </div>

        <div className="p-5 rounded-lg bg-gray-100">
          <h2 className="text-gray-500">Pending Invice</h2>
          <p className="text-2xl font-bold text-gray-900">{pendingInvoices}</p>
        </div>

        <div className="p-5 rounded-xl bg-white shadow">
          <h2 className="text-sm text-gray-500">Occupied Rooms</h2>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {occupiedRooms}
          </p>
        </div>
        <div className="p-5 rounded-lg bg-gray-100">
            <h2 className="text-gray-500">
                total Revenue
            </h2>
            <p className="text-2xl font-bold text-gray-900">
                {totalRevenue.toLocaleString()} บาท
            </p>
        </div>
      </div>
    </div>
  );
}
