'use strict'

const Complaint = use('App/Models/Complaint')
const { validateAll } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


/**
 * Resourceful controller for interacting with complaints
 */
class ComplaintController {
  async createComplaint({ request, response }) {
    try {

      // const complaint = await Complaint.create(request.all());
      const complaint = new Complaint()
      complaint.complaintDate = request.input('complaintDate');
      complaint.customerName = request.input('customerName');
      complaint.customerMobile = request.input('customerMobile');
      complaint.issueDetail = request.input('issueDetail');
      complaint.complaintStatus = request.input('complaintStatus');
      await complaint.save()
      return response.status(201).json({
        message: `complaint no. ${complaint._id} is Created Successfully`,
        data: complaint,
      });
    } catch (error) {
      console.log(error);
      response.status(403).json({
        status: "error",
        debug_error: error.message,
      });
    }
  }

  async listComplaint({ request, response }) {
    try {
      const complaint = await Complaint.all()
      return complaint;
    } catch (error) {
      console.log(error.message);
      response.status(403).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async complaintById({ request,  response, params }) {
    try {

      const id = params.id;
      const complaint = await Complaint.findOrFail(id);
      return complaint;
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: `complaint is not exist`,
      });
    }
  }

  async editComplaint({ request,  response, params }) {
    try {
      const id = params.id;
      const complaint = await Complaint.findBy("_id", id);
      if (!complaint) {
        return response.status(400).send({
          status: "error",
          message: `complaint is not exist`,
        });
      }

      const { complaintDate, customerName, customerMobile , issueDetail, complaintStatus} = request.all();

      complaint.complaintDate = complaintDate;
      complaint.customerName = customerName;
      complaint.customerMobile = customerMobile;
      complaint.issueDetail = issueDetail;
      complaint.complaintStatus = complaintStatus;
      await complaint.save();
      return response.status(200).send(complaint);
    } catch (error) {
      return response.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteComplaint({ request, response, params }) {
    try {

      const id = params.id;
      const complaint = await Complaint.findBy("_id", id);
      await complaint.delete();
      return response.status(201).json({
        message: `complaint ${complaint._id} is deleted Successfull`,
      });
    } catch (error) {
      response.status(400).send({
        status: "error",
        message: `complaint is not exist`,
      });
    }
  }
}

module.exports = ComplaintController
