import Group from '../models/Group';

class GroupController {
  async store(req, res) {
    const newGroup = await Group.create(req.body);
    return res.json({ newGroup });
  }
}
export default new GroupController();
