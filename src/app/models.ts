export class Models {

}

export interface States{
    states?:any[]
}

export interface Districts{
    districts?:any[]
}

export interface SessionsData{
    sessions:AvailableSession[]
}

export interface AvailableSession{
    name:string,
    address:string,
    pincode:string,
    available_capacity:string
   
}


