import {instance} from "../configs/axios.config";

class StudentService {
    static async getAllStudent() {
        return await instance.get("/students?_expand=group");
    }

    static async getAllStudentPaginate(_page, _per_page) {
        return await instance.get(`/students?_page=${_page}&_limit=${_per_page}&_expand=group`);
    }

    static async deleteStudentById(studentId) {
        return await instance.delete(`/students/${studentId}`);
    }

    static async createStudent(data) {
        return await instance.post("/students", data);
    }

    static async getStudentByStudentId(studentId) {
        return await instance.get(`/students/${studentId}?_expand=group`);
    }

    static async updateStudent(studentId, data) {
        return await instance.put(`/students/${studentId}`, data);
    }

    static async searchStudentByName(name) {
        return await instance.get(`/students?name_like=${name}&_expand=group`);
    }
}

export default StudentService;