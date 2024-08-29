import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/hero_img.png";

const RequestRow = () => {
  return (
    <>
      <tr>
        <td>
          <span className="id">1</span>
        </td>
        <td>
          <img
            src={img}
            alt="Product Image"
            className="responsive_img"
            width="50"
          />
        </td>
        <td className="title">
          Product 1 Lorem ipsum dolor sit aSDSDSDSDSDSSDSSDmet.
        </td>
        <td>
          <span className="request_id">12345</span>
        </td>
        <td className="arrival">14/07/24 4:00PM</td>
        <td className="leave">14/07/24 7:00PM</td>
        <td className="price">$10.00</td>
        <td>
          {/* complete
            pending
            canceled
            running
             */}
          <span className="status pending">pending</span>
        </td>
        <td className="actions">
          <Link title="view request">
            <i className="fa-regular fa-eye"></i>
          </Link>
          <Link title="confirm">
            <i className="fa-solid fa-check"></i>
          </Link>
          <Link title="cancel">
            <i className="fa-solid fa-xmark"></i>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
