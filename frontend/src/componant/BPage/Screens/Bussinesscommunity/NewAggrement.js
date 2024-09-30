import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './chatgroup.css';
const NewAggrement = () => {
  const location = useLocation();
  const { state } = location;
  const [usertype, setUserType] = useState(
    state.user_type == 0
      ? "Buyer"
      : state.user_type == 1
        ? "Seller"
        : "Business Partner"
  );

  const [showErrors, setShowErrors] = useState(false);

  const [newaggrement, setnewaggrement] = useState({
    date: new Date().toISOString().slice(0, 10),
    Buyer_name: state?.first_name + " " + state?.last_name,
    Company_name: "",
    Product_details: "",
    Product_quantity: "",
    Buying_price: "",
    Date_of_delivery: "",
    Buyer_Business_Partner_name: "",
    Business_Partner_commission: "",
    Date_of_transaction: "",
    document_submitted: "",
    Deal_Approved: "",
  });

  const CommonInputField = (
    name,
    value,
    onChange,
    placeholder,
    required,
    showError
  ) => {
    const inputWidth = value?.length * 4 + 150;
    var inputType = "text";

    if (
      [
        "phone",
        "amount",
        "no_of_days",
        "percentage_amount",
        "no_of_days2",
        "no_of_days3",
      ].includes(name)
    ) {
      inputType = "number";
    }

    const maxLength = name === "desc" ? 50 : undefined; // Apply maxLength only if name is "desc"

    return (
      <>
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          maxLength={maxLength} // Restrict the input to 50 characters if name is "desc"
          style={{
            width: inputWidth,
            borderColor: required && !value && showError ? "red" : "",
          }}
          placeholder={placeholder}
          className="aggrementinput pl-2 font-weight-bold"
        />
        {required && !value && showError && (
          <label
            className="input-label"
            style={{ color: "red", position: "absolute", left: 0, top: -20 }}
          >
            {`Please fill in the required field: ${placeholder}`}
          </label>
        )}
      </>
    );
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setnewaggrement({
      ...newaggrement,
      [name]: value,
    });
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid"></div>

      <div className="row my-2 mx-auto">
        <div className="col-lg-8 col-12 offset-lg-2">
          <div className="card p-3">
            <div
              className="pt-2 pb-3 text-center fonttitle font-weight-bold"
              style={{ color: "#2D2B70", fontWeight: "600" }}
            >
              Tri-Party E-Agreement with Escrow
            </div>
            <p className="fontcontent1 float-right text-end">
              <strong>Date:</strong> {newaggrement?.date}
            </p>
            <div className="section">
              <p className="fontcontent1">
                <strong>{state?.user_type == 0 ? 'Buyer' : "Seller"}:</strong><br />
                {newaggrement?.Buyer_name}<br />
                {state?.city},{state?.country}<br />
                {state?.phone} {state?.gmail}
              </p>
            </div>

            <div className="section">
              <p className="fontcontent1">
                Provide a Company name
                {CommonInputField("Company_name", newaggrement.Company_name, handleInputChange, "Name of Company", true, showErrors)}
              </p>
              <p className="fontcontent1">
                Provide the Product details
                {CommonInputField("Product_details", newaggrement.Product_details, handleInputChange, "product details", true, showErrors)}
              </p>
              <p className="fontcontent1">
                product quantity
                {CommonInputField("Product_quantity", newaggrement.Product_quantity, handleInputChange, "product quantity", true, showErrors)}
              </p>
            </div>
            <div className="section">

              <p className="fontcontent1">
                {state?.user_type == 0 ? 'Buying' : 'Selling'} price of the Product
                {CommonInputField("Buying_price", newaggrement.Buying_price, handleInputChange, "product price", true, showErrors)}
              </p>
              <p className="fontcontent1">
                set the Product Date of delivery
                {CommonInputField("Date_of_delivery", newaggrement.Date_of_delivery, handleInputChange, "Date of Delivery", true, showErrors)}
              </p>
              <p className="fontcontent1">
                Name of the {usertype} business partner
                {CommonInputField("Buyer_Business_Partner_name", newaggrement.Buyer_Business_Partner_name, handleInputChange, "BP name", true, showErrors)}
              </p>
            </div>
            <div className="section">
              <p className="fontcontent1">
                Provide your Business partner commission as percentage
                {CommonInputField("Business_Partner_commission", newaggrement.Business_Partner_commission, handleInputChange, "BP Commission percent", true, showErrors)}
              </p>
              <p className="fontcontent1">
                Date of transaction on connect souq payment gateway
                {CommonInputField("Date_of_transaction", newaggrement.Date_of_transaction, handleInputChange, "payment date", true, showErrors)}
              </p>
              <p className="fontcontent1">
                Official document submitted to Business Partner
                {CommonInputField("document_submitted", newaggrement.document_submitted, handleInputChange, "Documents", true, showErrors)}
              </p>
              <p className="fontcontent1">
                Deal Approved
                {CommonInputField("Deal_Approved", newaggrement.Deal_Approved, handleInputChange, "Approved", true, showErrors)}
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-connect w-50" onClick={()=>{}}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAggrement;
