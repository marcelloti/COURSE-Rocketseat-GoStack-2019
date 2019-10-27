import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Enrolment from '../models/Enrolment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';

class EnrolmentController {
  async index(req, res) {
    const enrolments = await Enrolment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    return res.json(enrolments);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const enrolment = await Enrolment.findByPk(id);

    if (!enrolment) {
      return res.status(404).json({ error: 'Enrolment does not exists' });
    }

    const { student_id, plan_id, start_date, end_date, price } = enrolment;

    return res.json({
      id,
      plan_id,
      student_id,
      start_date,
      end_date,
      price,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    let { start_date } = req.body;
    const { student_id, plan_id } = req.body;

    start_date = parseISO(start_date);
    start_date = format(start_date, "yyyy-MM-dd'T00:00:00'.'000Z'", {
      locale: pt,
    });

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: `Plan ${plan_id} did not exists` });
    }

    let end_date = addMonths(new Date(), planExists.duration);
    end_date = format(end_date, "yyyy-MM-dd'T23:59:59'.'000Z'", {
      locale: pt,
    });

    const { price } = planExists;

    const studentExists = await Student.findByPk(student_id);
    if (!studentExists) {
      return res
        .status(400)
        .json({ error: `Student ${student_id} did not exists` });
    }

    const enrolment = await Enrolment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    // Sending mail (for now, without redis)
    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Enrolment registered',
      template: 'enrolment',
      context: {
        student: studentExists.name,
        start_date: format(parseISO(start_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
        end_date: format(parseISO(end_date), 'dd/MM/yyyy', {
          locale: pt,
        }),
        plan: planExists.title,
        price: enrolment.price,
      },
    });

    return res.json(enrolment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrolmentExists = await Enrolment.findByPk(id);

    if (!enrolmentExists) {
      return res.status(400).json({ error: `Enrolment ${id} did not exists` });
    }

    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = enrolmentExists;
    await enrolmentExists.destroy();

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const enrolmentExists = await Enrolment.findByPk(id);

    if (!enrolmentExists) {
      return res.status(400).json({ error: `Enrolment ${id} did not exists` });
    }

    const { student_id, plan_id } = req.body;

    let { start_date } = req.body;

    start_date = parseISO(start_date);
    start_date = format(start_date, "yyyy-MM-dd'T00:00:00'.'000Z'", {
      locale: pt,
    });

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: `Plan ${plan_id} did not exists` });
    }

    let end_date = addMonths(new Date(), planExists.duration);
    end_date = format(end_date, "yyyy-MM-dd'T23:59:59'.'000Z'", {
      locale: pt,
    });

    const { price } = planExists;

    await enrolmentExists.update({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }
}

export default new EnrolmentController();
