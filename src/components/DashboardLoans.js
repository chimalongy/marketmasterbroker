import React, {useState} from "react";
import "../styles/DashboardLoans.css"

function DashboardLoans() {
  const [formData, setFormData] = useState({
    name: "Pascal John",
    amount: "",
    duration: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    // Simple validation, checking if fields are empty
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    }
    if (!formData.duration.trim()) {
      newErrors.duration = 'Loan Duration is required';
    }
    if (!formData.remark.trim()) {
      newErrors.remark = 'Why do you want this loan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Process form submission
      console.log("Form submitted successfully:", formData);
    } else {
      console.log("Form contains errors");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
  //   <div className="loan-application">
  //   {Object.keys(errors).length > 0 && (
  //     <div className="error-container">
  //       <p className="error-lable">Please fix the following errors:</p>
  //       <ul>
  //         {Object.values(errors).map((error, index) => (
  //           <li className="error-item" key={index}>
  //             - {error}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   )}
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-field">
  //       <label htmlFor="name">Name*</label>
  //       <input type="text" id="name" name="name" value={formData.name} />
  //     </div>

  //     <div className="form-field">
  //       <label htmlFor="amount">Amount*</label>
  //       <input
  //         type="number"
  //         id="amount"
  //         name="amount"
  //         value={formData.amount}
  //         onChange={handleChange}
  //       />
  //     </div>

  //     <div className="form-field">
  //       <label htmlFor="duration">Duration</label>
  //       <select
  //         id="duration"
  //         name="duration"
  //         value={formData.duration}
  //         onChange={handleChange}
  //       >
  //         <option value="">Duration in Months</option>
  //         <option value="1">1 Month</option>
  //         <option value="2">2 Months</option>
  //         <option value="3">3 Months</option>
  //         <option value="6">6 Months</option>
  //         <option value="12">12 Months</option>
  //         <option value="24">24 Months</option>
  //         <option value="36">36 Months</option>
  //       </select>
  //     </div>

  //     <div className="form-field">
  //       <label htmlFor="remark">Remark</label>
  //       <textarea
  //         id="remark"
  //         name="remark"
  //         value={formData.remark}
  //         onChange={handleChange}
  //       />
  //     </div>

  //     <div className="agreement-container">
  //       <input
  //         type="checkbox"
  //         id="checkbox"
  //         checked={isChecked}
  //         onChange={handleCheckboxChange}
  //       />
  //       {/* Label for the checkbox */}
  //       <label htmlFor="checkbox">I agree to the loan terms.</label>
  //     </div>
  //     <button type="submit">Submit</button>
  //   </form>
  // </div>
    <div className="DashboardLoans">
     
      <div className="loan-not-eligible">
      <i class="fa-solid fa-circle-info"></i>
      <h1>You are not yet eligible for a loan.</h1>
      </div>

      <div className="loan-list">
      <h1>Loan Requests</h1>
      <p>No Requests</p>
      </div>
    </div>
  );
}

export default DashboardLoans;
