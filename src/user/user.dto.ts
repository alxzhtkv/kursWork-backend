interface IUserDto{
    email:string;
    userId: number;
    role: string;
    isActivated: boolean;
}

class UserDto{
    email:string;
    userId: number;
    isActivated: boolean;
    role: string;

    constructor(model: IUserDto){
        this.email=model.email;
        this.userId=model.userId;
        this.isActivated=model.isActivated;
        this.role=model.role;
    }
}

export default UserDto
///блять 