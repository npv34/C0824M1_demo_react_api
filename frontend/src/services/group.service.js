import {instance} from "../configs/axios.config";

class GroupService{
    static async getAllGroups() {
        return await instance.get('/groups');
    }
}

export default GroupService;