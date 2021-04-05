export interface AccountLogin {
    email: string
    password: string
}

export interface AccountLogout {
    _id: string
}

export interface User {
    _id?: string
    email: string
    password: string
    role: string
    name?: string
    createdAt: Date
    updatedAt: Date
}
