import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
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

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    const { id } = req.params;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;

    const studentExists = await Student.findByPk(id);
    if (!studentExists) {
      return res.status(400).json({ error: `Student ${id} did not exists` });
    }

    const helpOrder = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(helpOrder);
  }

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
      attributes: ['question', 'answer', 'created_at'],
      where: { student_id: id },
      order: ['created_at'],
    });

    if (!helpOrders) {
      return res.status(404).json({ error: 'Help orders does not exists' });
    }

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const helpOrderExists = await HelpOrder.findByPk(id);

    if (!helpOrderExists) {
      return res.status(400).json({ error: `Help order ${id} did not exists` });
    }

    const helpOrderData = await HelpOrder.findAll({
      where: { id },
      order: ['created_at'],
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    let currentDate = new Date();
    currentDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'.'SSS'Z'", {
      locale: pt,
    });

    const { answer } = req.body;

    const { question } = helpOrderData[0];
    const { name, email } = helpOrderData[0].student;

    // Sending mail (for now, without redis)
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Helper Order Answered',
      template: 'helporder',
      context: {
        student: name,
        question,
        answer,
      },
    });

    await helpOrderExists.update({
      question,
      answer,
      answer_at: currentDate,
    });

    res.json({
      id,
      question,
      answer,
    });
  }
}

export default new HelpOrderController();
