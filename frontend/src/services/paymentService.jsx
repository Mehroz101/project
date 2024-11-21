import React, { useState } from "react";
import CryptoJS from "crypto-js"; // Import the crypto-js library

const AmountForm = () => {
  // Initialize state with default values for all fields
  const [formData, setFormData] = useState({
    pp_Version: "1.1",
    pp_TxnType: "",
    pp_MerchantID: "MC139363",
    pp_Language: "EN",
    pp_SubMerchantID: "",
    pp_Password: "7xs3339t90",
    pp_TxnRefNo: `T${Date.now()}`,
    pp_Amount: "",
    pp_DiscountedAmount: "",
    pp_DiscountBank: "",
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: "20241120215254",
    pp_TxnExpiryDateTime: "20241121215254",
    pp_BillReference: "billRef",
    pp_Description: "Description of transaction",
    pp_ReturnURL: "www.google.com",
    pp_SecureHash: "",
    ppmpf_1: "1",
    ppmpf_2: "2",
    ppmpf_3: "3",
    ppmpf_4: "4",
    ppmpf_5: "5",
    salt: "4c5sfg3y89",
  });
  const createHash = () => {
    const IntegritySalt = formData.salt;
    let hashString = "";

    // Build the hash string based on the required fields
    hashString += IntegritySalt + "&";
    hashString += formData.pp_Amount + "&";
    hashString += formData.pp_BillReference + "&";
    hashString += formData.pp_Description + "&";
    hashString += formData.pp_Language + "&";
    hashString += formData.pp_MerchantID + "&";
    hashString += formData.pp_Password + "&";
    hashString += formData.pp_ReturnURL + "&";
    hashString += formData.pp_TxnCurrency + "&";
    hashString += formData.pp_TxnDateTime + "&";
    hashString += formData.pp_TxnExpiryDateTime + "&";
    hashString += formData.pp_TxnRefNo + "&";
    hashString += formData.pp_TxnType + "&";
    hashString += formData.pp_Version + "&";
    hashString += formData.ppmpf_1 + "&";
    hashString += formData.ppmpf_2 + "&";
    hashString += formData.ppmpf_3 + "&";
    hashString += formData.ppmpf_4 + "&";
    hashString += formData.ppmpf_5;

    // Remove the last '&' character
    hashString = hashString.slice(0, -1);

    // Create HMAC SHA256 hash
    const hash = CryptoJS.HmacSHA256(hashString, IntegritySalt).toString(
      CryptoJS.enc.Hex
    );
    setFormData((prevData) => ({
      ...prevData,
      pp_SecureHash: hash, // Set the hash in the state
    }));
  };
  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handlePaymentSubmit = async () => {
    createHash();
    console.log("Submitted Data:", formData);
    // You can add your form submission logic here
    try {
      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/";

      // Append all form data as hidden inputs
      Object.keys(formData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = formData[key]; // Use the rounded amount directly
        form.appendChild(input);
      });

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit(); 
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setFormData,
    formData,
    handleInputChange,
    handlePaymentSubmit,
  };
};

export default AmountForm;
