const Transaction = require("../modal/Transaction");
const User = require("../modal/User");
const OtherNotify = require("../modal/OtherNotification");
const BankInfo = require('../modal/BankInfo')
const BusinessInfo = require('../modal/BusinessInfo')
let Validator = require("validatorjs");
var randomstring = require("randomstring");
const responseHandlier = require('../Utils/response/status');
var nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
var { SICKEY, STRIPEKEY } = require("../Utils/util/stripe");
const stripe1 = require('stripe')(STRIPEKEY);
const stripe = require('stripe')(SICKEY);
exports.addTransaction = async (req, res) => {
  try {
    const rules = {
      projectId: "required",
      bpId: "required",
      senderId: "required",
      receiverId: "required",
    };
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return responseHandlier.errorResponse(false, validation.errors.all(), res);
    }
    const checkexists = await OtherNotify.findOne({
      user_id: req.body.receiverId,
      bp_id: req.body.senderId,
      client_id: req.body.client_id
    }).exec()
    if (checkexists) {
      return responseHandlier.errorResponse(false, "Already user Exists", res);
    }
    const update = {
      payment: req.body.payment,
      status: 1,
      mop: req.body.mop,
      remark: req.body.remark,
      amount: req.body.amount,
      currency: req.body.currency,
      dueDate: req.body.dueDate,
      transactionNo: req.body.transactionNo,
      invoiceNo: req.body.invoiceNo,
      projectId: req.body.projectId,
      client_id: req.body.client_id,
      bpId: req.body.bpId,
      senderId: req.body.senderId,
      bpCharges: req.body.bpCharges,
      receiverId: req.body.receiverId,
    };
    const updatedTransaction = new Transaction(update);
    await updatedTransaction.save();

    // const Listdata = new OtherNotify({
    //   user_id: req.body.receiverId,
    //   bp_id: req.body.senderId,
    //   client_id: req.body.client_id,
    //   transaction_id: updatedTransaction._id,
    //   description: "Got New Invoice form " + req.body.email.split("@")[0],
    // });
    // await Listdata.save();
    return res.json({
      message: 'Transaction added successfully',
      status: true,
      data: updatedTransaction
    });
  } catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
  }
};

exports.InvoiceTransaction = async (req, res) => {
  try {
    const rules = {
      senderId: "required",
      receiverId: "required",
    };
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return responseHandlier.errorResponse(false, validation.errors.all(), res);
    }
    var {
      receiverCharges,
      amount,
      bp_charges,
      csFee,
      tax,
      client_id,
      senderId,
      receiverId,
      transactionNo,
      invoiceNo,
      currency,
      projectId
    } = req.body
    const update = {
      receiverCharges,
      amount,
      bp_charges,
      csFee,
      tax,
      transactionNo,
      invoiceNo,
      currency,
      client_id,
      status: 1,
      senderId,
      receiverId,
      projectId
    };

    // Find the transaction by a unique field, e.g., transactionNo
    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        client_id: req.body.client_id,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId
      }, // criteria to find the document
      update, // data to update
      { new: true, upsert: true } // options: return the updated document, create if not found
    );
    return res.json({
      message: 'Transaction added successfully',
      status: true,
      data: updatedTransaction
    });
  } catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
  }
};

exports.ListTransaction = async (req, res) => {
  const ID = req.params.id;
  const receiver = req.params.receiver;
  const Type = req.params.type;
  const ProjectId = req.params.projectId
  try {
    let items = [];
    if (Type == 1) {
      if (mongoose.Types.ObjectId.isValid(ProjectId)) {
        items = await Transaction.find({ pbId: ID, projectId: ProjectId }).exec();
      } else {
        return res.status(400).send({
          status: false,
          message: "Invalid ProjectId"
        });
      }
    } else if(Type != 1){
      if (mongoose.Types.ObjectId.isValid(ProjectId)) {
        items = await Transaction.find({ senderId: ID, projectId: ProjectId }).exec();
      } else {
        items = (await Transaction.find({
          $or: [
            { $and: [{ senderId: ID }, { receiverId: receiver }] },
            { $and: [{ senderId: receiver }, { receiverId: ID }] }
          ]
        }).exec()).filter(item => item.receiverCharges.length > 0);
      }
    }
    return res.status(200).send({
      status: true,
      message: "Transaction listed successfully",
      data: items,
    });
  } catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
  }
};
exports.ListNotify = async (req, res) => {
  var ItemId = req.params.id
  var InvoiceList = await OtherNotify.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'users'
      }
    },
    {
      $match: {
        "client_id": mongoose.Types.ObjectId(ItemId),
        "type": "BPSIDE"
      }
    }
  ]).exec();
  return res.status(200).send({
    status: true,
    message: "listed Successfully",
    invoice: InvoiceList,
  });
}
exports.ListBpNotify = async (req, res) => {
  try {
    const ID = req.params.id;
    var items = await Transaction.find({ senderId: ID }).exec();
    return res.status(200).send({
      status: true,
      message: "Transaction listed successfully",
      data: items,
    });
  } catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
  }
}
exports.updateInvoice = async(req, res) => {
  try {
    const _id = req.params.id;
    var items = await Transaction.findByIdAndUpdate(_id,
      {
        status: 2
      }).exec();
    return res.status(200).send({
      status: true,
      message: "Updated Transaction Invocie",
      data: items,
    });
  } catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
  }
}
exports.updateInvoiceItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const {
      receiverCharges,
      amount,
      bp_charges,
      csFee,
      transactionNo,
      invoiceNo,
      tax,
      currency
    } = req.body    
    var updateNotify = await OtherNotify.findOneAndUpdate(
      {
        client_id: req.body.client_id,
        transaction_id: _id
      },
      {
        status: 1
      },
      { new: true }).exec();
    var items = await Transaction.findByIdAndUpdate(_id,
      {
        receiverCharges,
        amount,
        bp_charges,
        csFee,
        tax,
        transactionNo,
        invoiceNo,
        currency,
        status: 1
      },
      { new: true }).exec();
    const user = await User.findById(req.body.client_id).exec()
    const mergedData = {
      ...items.toObject(),
      email: user.gmail // Assuming the user's email field is named 'email'
    };
    await sendInvoice(mergedData)
    return res.status(200).send({
      status: true,
      message: "Updated Transaction Invocie",
      data: items,
    });
  } catch (err) {
    return responseHandlier.errorResponse(false, err.message, res);
  }
}
const sendInvoice = async (objectData) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: "pathways@qcodesinfotech.com",
      pass: "Qcodes@123"
    }
  });
  let mailOptions = {
    from: "pathways@qcodesinfotech.com",
    to: objectData.email,
    subject: 'Connect Souq Invoice',
    html: `
<head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container" style="display: flex;justify-content: center;align-items: center;height: 100vh;width: 100%;">
          <div class="card" style="height: auto;width:700px;border: 0.5px solid grey;border-radius: 10px;overflow: hidden;">
                 <h2 style="background-color: #8ac43f;color: white;margin: 0px;text-align: center;padding: 5px;font-family: Poppins">Invoice</h2>
                  <div style="display: flex;justify-content: space-between; padding: 20px;">
                     <div> <img src="http://connect-client.qcodesinfotech.com/images/icons/logo.png" alt="logo" style="height: 50px;width: 50px;"></div>
                     <div> <p style="margin: 0px;font-family: Poppins">Date : 25-06-24</p>
                           <p style="margin: 0px;font-family: Poppins">Time: 05:41 PM</p>
                    </div>
                  </div>
                  <p style="padding:0px 20px;text-align: center;font-family: Poppins">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab incidunt voluptates culpa assumenda repellendus deleniti amet iste, nisi molestias delectus!</p>
                  <div style="display: flex"></divstyle>
                      <div >
                         <p style="margin: 0px 40px; color: grey;padding: 2px 0px; font-family: Poppins">Referance Id :</p> 
                         <p style="margin: 0px 40px;color: grey; padding: 2px 0px;  font-family: Poppins">Date & Time :</p> 
                        //  <p style="margin: 0px 40px;color: grey; padding: 2px 0px; font-family: Poppins">currency :</p> 
                         <p style="margin: 0px 40px;color: grey; padding: 2px 0px; font-family: Poppins">Transition Number :</p> 
                        //  <p style="margin: 0px 40px;color: grey; padding: 2px 0px;  font-family: Poppins">Due Date :</p> 
                         <p style="margin: 0px 40px; font-weight: 700; padding: 2px 0px;  font-family: Poppins">Total Amount :</p> 
                        //  <p style="margin: 0px 40px;font-weight: 700; padding-bottom: 2px; font-family: Poppins">Paid Amount :</p> 
                      </div>
                      <div>
                        <p style="margin: 0px 20px; padding: 4px 0px;">${objectData.invoiceNo}</p>
                        <p style="margin: 0px 20px; padding: 2px 0px;font-family: Poppins">25-06-24/05:41 PM</p>
                        // <p style="margin: 0px 20px; padding: 2px 0px;   font-family: Poppins">${objectData.currency}</p>
                        <p style="margin: 0px 20px; padding: 2px 0px;   font-family: Poppins">${objectData.transactionNo}</p>
                        // <p style="margin: 0px 20px; padding: 2px 0px;   font-family: Poppins">${objectData.dueDate}</p>
                        <p style="margin: 0px 20px;color: green; padding: 2px 0px;   font-family: Poppins">${objectData.amount}</p>
                        // <p style="margin: 0px 20px;color: green; padding: 2px 0px;   font-family: Poppins">${objectData.payment}</p>
                     </div>
                  </div>
                  <div style="text-align: end;padding: 20px; ">
                    <p style="margin: 0px 20px;color: grey;font-family: Poppins">Business Partner :</p>
                    <p style="margin: 0px 20px;font-family: Poppins">John Doe</p>
                  </div>
          </div>
    </div>
</body>
` };
  try {
    let info = await transporter.sendMail(mailOptions);
    return info.messageId;
  } catch (error) {
    throw error;
  }
}

exports.PaymentCard = async (req, res) => {

  const {user_id,card_no,sender_id,expiry,cvv,transaction_id} = req.body
const userdata = await verifyAccount(sender_id);
if(!userdata.status){
  return res.status(500).json(userdata);
}
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(user_id) },{ password: 0, otp: 0 }).exec();
  if (!user) {
    return res.status(500).json({ message: "user not exists ", status: false });
  }
  if (user.st_customid == "0") {
    var param = {};
    param.email = user.gmail;
    param.name = user.first_name + " " + user.last_name;
    param.description = `payment for user data~${user_id}`;
    customer = await stripe.customers.create(param)
    user.st_customid = customer.id;
    user.save()
  } else {
    customer.id = await user.st_customid;
  }
  try {
    var existingCards = await stripe.customers.listSources(customer.id, {
      object: 'card',
    })

  } catch (error) {
    var param = {};
    param.email = user.gmail;
    param.name = user.first_name + " " + user.last_name;
    param.description = `payment for user data~${user_id}`;
    customer = await stripe.customers.create(param)
    user.st_customid = customer.id;
    user.save()
    var existingCards = await stripe.customers.listSources(customer.id, {
      object: 'card',
    })
  }

  const cardNumberString = card_no.toString();
  const last4Digits = cardNumberString.slice(-4);
  if (existingCards.data.some(existingCard => existingCard.last4 == last4Digits)) {
    var dataObject = await existingCards.data.find(existingCard => existingCard.last4 == last4Digits);
    const updatedCardToken = await stripe.tokens.create({
      card: {
        number: card_no,
        exp_month: expiry.split("/")[0],
        exp_year: expiry.split("/")[1],
        cvc: cvv,
      },
    });

    var dataUpdated = await stripe.customers.updateSource(customer.id, dataObject.id, {
      metadata: {
        cardview: status,
      },
    });
    res.status(501).json({ message: 'Card number already exists for this customer.', status: true, data: dataUpdated });
    return
  }
  var param = {
    card: {
      number: card_no,
      exp_month: expiry.split("/")[0],
      exp_year: expiry.split("/")[1],
      cvc: cvv,
    },
  };

  const card = await stripe1.tokens.create(param)
  const customeradd = await stripe.customers.createSource(customer.id,
  {
      source: card.id,
      metadata: {
        cardview: status,
      }
  })

 return res.status(200).send({
    status: 'success',
    message: 'Card added to customer successfully',
    data:customeradd
  });
}



const verifyAccount = async(sender_id) => {
  var userDada = await User.findOne({ _id: sender_id });
  var businessData = await BusinessInfo.findOne({ user_id: sender_id });
  var bankData = await BankInfo.findOne({ user_id: sender_id });
  if (!userDada || !businessData  || !bankData) {
    return {
      status: false,
      message: "Please complete providers business detail process",
      data: {},
      stripres: {},
    };
  }
  var stripe_id = userDada.stripe_id;
  if (!stripe_id) {
    const account = await stripe.accounts.create({
      type: 'custom',
      country: 'CA',
      email: userDada.gmail,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    stripe_id = account.id;
    await User.findByIdAndUpdate(
      userDada._id,
      { stripe_id: stripe_id },
      { new: true }
    );
  }
  var stripeData = {
    business_type: 'individual',
    individual: {
      first_name: userDada.first_name,
      last_name: userDada.last_name,
      email: userDada.gmail,
      phone: userDada.phone,
      address: {
        line1: businessData.company_address,
        city: businessData.city,
        state: businessData.city,
        postal_code: businessData.company_address,
        country: 'CA',
      },
      dob: {
        day: userDada.date_of_birth.split('/')[0],
        month: userDada.date_of_birth.split('/')[1],
        year: userDada.date_of_birth.split('/')[2],
      },
      // id_number: userDada?.acc_ssn_number
    },
    business_profile: {
      mcc: '5734',
      url: businessData.website || 'https://www.qcodesinfotech.com',
    },
    tos_acceptance: {
      date: Math.floor(Date.now() / 1000),
      ip: '127.0.0.1',
    },
    company: {
      // tax_id: businessData.hst_number,
      tax_id: businessData.company_name,
      name: businessData.company_name
    },
    external_account: {
      object: 'bank_account',
      country: 'CA',
      currency: 'cad',
      account_holder_name: userDada.first_name + " " + userDada.last_name,
      account_holder_type: 'individual',
      routing_number: bankData.institution_number,
      account_number: bankData.account_number,
    },
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
          interval: "daily"
        },
      },
      payments: {
        statement_descriptor: "testing mode"
      }
    }
  };

  var stripres = {};
  await stripe.accounts.update(stripe_id, stripeData)
    .then((res) => {
      stripres = {
        status: true,
        message: "stripe connected successfully",
        data: res
      }
    })
    .catch((error) => {
      stripres = {
        status: false,
        message: error.message
      }
    })

  if (stripres.status) {
    return stripres;
  } else {
    return stripres;
  }
}


// PaymentCard()