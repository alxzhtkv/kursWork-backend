interface IUserDto{
    email:string;
    userId: number;
    role: string;
    firstName: string,
    lastName: string;

}

class UserDto{
    email:string;
    userId: number;
    role: string;
    firstName: string;
    lastName: string;

    constructor(model: IUserDto){
        this.email=model.email;
        this.userId=model.userId;
        this.role=model.role;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}

export default UserDto
///блять 