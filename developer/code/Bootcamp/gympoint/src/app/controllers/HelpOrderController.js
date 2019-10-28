import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
    async show(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number()
            .positive()
            .integer()
            .required(),
        });
    
        const { id } = req.params;
    
        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
      
        const helpOrders = await HelpOrder.findAll({
            where: { student_id: id },
            order: ['created_at'],
            attributes: ['created_at'],
            include: [
                {
                model: Student,
                as: 'student',
                attributes: ['name'],
                },
            ],
        });
      
        if (!helpOrders) {
            return res.status(404).json({ error: 'Help orders does not exists' });
        }
      
        return res.json(helpOrders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
          question: Yup.string().required(),
          answer: Yup.string().required(),
        });
    
        const { id } = req.params;
        const { question, answer } = req.params;
    
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ error: 'Validation fails' });
        }
    
        const studentExists = await Student.findByPk(id);
        if (!studentExists) {
          return res.status(400).json({ error: `Student ${id} did not exists` });
        }
    
        
        const helpOrder = await HelpOrder.create({
          student_id: id,
          question,
          answer
        });
    
        return res.json(helpOrder);
    }
}

export default new HelpOrderController();