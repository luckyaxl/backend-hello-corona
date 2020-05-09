const { consultation, reply, user } = require("../models");

exports.consul = async (req, res) => {
  try {
    req.body.userId = req.user;
    console.log(req.role);
    if (req.role === 0) {
      const newConsul = await consultation.create(req.body);
      const consul = await consultation.findOne({
        where: { id: newConsul.id }
      });
      res.status(200).send({ data: consul });
    } else {
      res.status(405).send({ message: "Failure" });
    }
  } catch (error) {
    res.status(500).send({ message: "Unknown Request" });
    console.log(error);
  }
};

// Get By Id COnsultation
exports.getconsul = async (req, res) => {
  try {
    const rep = await reply.findOne({ where: { consultationId: req.params.id } });

    if (rep) {
      const consul = await consultation.findOne({
        where: { id: req.params.id },
        include: { model: reply, where: { consultationId: req.params.id } }
      });
      res.status(200).send({ data: consul });
    } else {
      const consul = await consultation.findOne({
        where: { id: req.params.id }
      });
      res.status(200).send({ data: consul });
    }
  } catch (error) {
    res.status(500).send({ message: "Unknown Request" });
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    if (req.role === 0) {
      const consul = await consultation.findAll({
        where: { userId: req.user },
        order: [["createdAt", "DESC"]],
        include: {
          model: reply,
          include: {
            model: user,
            attributes: ["fullname"]
          }
        }
      });
      res.status(200).send({ data: consul });
    } else {
      const consul = await consultation.findAll({
        include: {
          model: reply,
          include: {
            model: user,
            attributes: ["fullname"]
          }
        }
      });
      res.status(200).send({ data: consul });
    }
  } catch (error) {
    res.status(500).send({ message: "Unknown Request" });
    console.log(error);
  }
};

exports.reply = async (req, res) => {
  req.body.userId = req.user;
  try {
    const id = req.body.consultationId;
    if (req.role === 1) {
      const consul = await reply.findOne({
        where: { consultationId: id }
      });

      if (consul) {
        // Update comment replies
        await reply.update(req.body, {
          where: { consultationId: id }
        });

        const consul = await reply.findOne({
          where: { consultationId: id },
          include: { model: consultation }
        });
        res.status(201).send({ data: consul });
      } else {
        // Create New Entry For Replies
        await reply.create(req.body);
        await consultation.update(
          { status: "Waiting Consultation Live" },
          { where: { id: req.body.consultationId } }
        );
        res.status(201).send({ message: "success" });
      }
    } else {
      res.status(405).send({ message: "Failure" });
    }
  } catch (error) {
    res.status(500).send({ message: "Unknown Request" });
    console.log(error);
  }
};
