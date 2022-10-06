interface UserLogin {
    id: number;
    usuario: string;
    foto: string;
    senha: string;
    token: string | null
}

export default UserLogin;