import api from "@/lib/axios"

export const tenantService = {
    getTenants(){
        return api.get("/tenants")
    }
}