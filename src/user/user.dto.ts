interface IUserDto{
    email:string;
    userId: number;
    role: string;
}

class UserDto{
    email:string;
    userId: number;
    role: string;

    constructor(model: IUserDto){
        this.email=model.email;
        this.userId=model.userId;
        this.role=model.role;
    }
}

export default UserDto
///блять 