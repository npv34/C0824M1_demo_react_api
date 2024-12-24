import {instance} from "../configs/axios.config";

class StudentService {
    static async getAllStudent() {
        return await instance.get("/students?_expand=group");
    }

    static async deleteStudentById(studentId) {
        return await instance.delete(`/students/${studentId}`);
    }

    static async createStudent(data) {
        return await instance.post("/students", data);
    }
}

export default StudentService;