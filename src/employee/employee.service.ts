import { Employee } from "./employee.model";

class EmployeeService {
    async saveEmployee(userId: number, firstName: string,  lastName: string , position: string ) {
        const token = await Employee.create({userId, firstName, lastName, position})

    }
}


export default EmployeeService

