import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/hero_img.png";

const WithdrawRow = () => {
  return (
    <>
      <tr>
        <td>
          <span className="id">1</span>
        </td>
        <td>
            <span>14/07/2024</span>
        </td>
        <td>
            <span>Mehroz Farooq</span>
        </td>
        <td>
            <span>1234567780</span>
        </td>
        <td>

          {/* pending complete canceled */}
            <span className="status complete">complete</span>
        </td>
        <td>
            <span>1234</span>
        </td>
        <td>
            <span>$343</span>
        </td>
      </tr>
    </>
  );
};

export default WithdrawRow;
