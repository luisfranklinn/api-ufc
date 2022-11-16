import House_Acess from '../models/House';

class HouseController {

  async store(req, res) {
    const { UID, student_name, date_time, acess_type } = req.body;



    const acess = await House_Acess.create({
      UID, student_name, date_time, acess_type,
    });

    return res.json(acess);
  }

}

export default new HouseController();