import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";

const AdminPage = ({proizvodi,orders}) => {



  useEffect(() => {
    if (orders.length) {
      $("#orders-table").DataTable();
    }
  }, [orders]);



  return (
    <div>
      <h1>Admin Page</h1>
      <table id="orders-table" className="display responsive nowrap">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>User</th>
            <th>Items</th>
            <th>Created At</th> 
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.user.name}</td>
              <td>
                {
                order.items? 
                    order.items.map((item, index) => (
                        <div key={index}>{`${proizvodi[item].name}`}
                        {/* {console.log(item)}
                        {console.log(proizvodi[item])} */}
                        </div>
                    
                ))
                :
                <></>
                }
              </td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
