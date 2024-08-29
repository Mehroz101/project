import React, { useState } from 'react'
import "../styles/Earning.css"
import SpaceRow from './SpaceRow'
import WithdrawRow from './WithdrawRow'
const Earning = () => {
    const [popup,setPopup] = useState(false)
    return (
        <>
            <div className="earning_container">
                <h2>Earning</h2>
                <div className="earning_container_top">
                    <div className="current_balance">
                        <div className="amount">
                            <span>withdrawable  balance</span>
                            <h2>$345</h2>
                        </div>
                        <button onClick={()=>setPopup(true)}>withdraw</button>
                    </div>
                    <div className="balance_history">
                        <div className="last_month">
                            <div className="amount">
                            <span>last month</span>
                            <h2>$345</h2>
                        </div>
                        </div>
                        <div className="life_time">
                            <div className="amount">
                            <span>total earning</span>
                            <h2>$345</h2>
                        </div>
                        </div>
                    </div>

                </div>
                    <h2>History</h2>
                <div className="earning_list">
          <table className="highlight responsive_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Account holder name</th>
                <th>Account number</th>
                <th>Status</th>
                <th>Order number</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <WithdrawRow/>
              <WithdrawRow/>
              <WithdrawRow/>
              <WithdrawRow/>
              <WithdrawRow/>
              <WithdrawRow/>
            </tbody>
          </table>
        </div>
        <div className={popup ? "withdraw_popup_container": " popup_hide "}>
            <div className="withdraw_popup">
                <span className='cross_icon' ><i className="fa-solid fa-xmark" onClick={()=>setPopup(false)}></i></span>
                <h2>Withdraw Balance</h2>
                <p>Write your withdraw details</p>
                <div className="withdraw_detail_box">
                    <div className="input_box">
                        <span>Transfer to</span>
                        <select name="method" id="method">
                            <option value="easypaisa">easypaisa</option>
                            <option value="jazzcash">jazzcash</option>
                            <option value="bank">bank account</option>
                        </select>
                    </div>
                    <div className="input_box">
                        <span>Account Holder Name</span>
                        <input type="text" placeholder='Account holder name' />
                    </div>
                    <div className="input_box">
                        <span>Account Number</span>
                    <input type="number" placeholder='Enter account number' />
                    </div>
                    <div className="input_box amount">
                        <span>Amount Withdraw</span>
                        <span>$232</span>
                    </div>
                </div>
                    <div className="btn_box">
                        <button className='cancel'>Cancel</button>
                        <button className='withdraw'>Confirm & Withdraw</button>
                    </div>
                    <p className='note'>Please note withdraw minimum amount $25 per withdraw and cannot be undone after withraw. it may take 7 business days to process payment.</p>
            </div>
        </div>
            </div>
        </>
    )
}

export default Earning
