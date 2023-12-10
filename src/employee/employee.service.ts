import { Employee } from "./employee.model";

class EmployeeService {
    async saveEmployee(userId: number, firstName: string,  lastName: string , position: string ) {
        await Employee.create({userId, firstName, lastName, position})

    }
    async getEmployee(userId: number){
        const employee = await Employee.findOne({ where: { userId } });
        return employee
    }
}


export default EmployeeService

