import api from "@/lib/axios"

export const roomService = {
    getRooms() {
        return api.get("/rooms")
    }
}