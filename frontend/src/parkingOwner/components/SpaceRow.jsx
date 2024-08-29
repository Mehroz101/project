import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/hero_img.png";

const SpaceRow = () => {
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

          <span className="badge">secure</span>
        </td>
        <td>
          <span className="request_id">12345</span>
        </td>
        <td className="total_booking">123</td>
        <td className="price">$10.00</td>
        <td>
          {/* active 
          deactivated
             */}
          <span className="status active">active</span>
        </td>
        <td className="actions">
          <Link title="view space">
            <i className="fa-regular fa-eye"></i>
          </Link>
          <Link title="edit">
            <i class="fa-solid fa-pen"></i>
          </Link>
          <Link title="pause">
            <i class="fa-solid fa-pause"></i>
          </Link>
          <Link title="delete">
            <i class="fa-solid fa-trash"></i>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default SpaceRow;
