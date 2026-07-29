export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";
  monthlyRent: number;
}