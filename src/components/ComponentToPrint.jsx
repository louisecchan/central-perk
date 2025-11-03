import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  return (
    <div ref={ref} className="p-5" style={{ backgroundColor: 'white', color: 'black' }}>
      <table className="table">
        <thead>
          <tr className="receipt-heading">
            <th colspan="5">Central Perk</th>
          </tr>
          <tr className="receipt-spacer">
            <td colspan="5">&nbsp;</td>
          </tr>
          <tr className="receipt-subheading">
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {cart
            ? cart.map((cartProduct, key) => (
                <tr key={key}>
                  <td>{cartProduct.id}</td>
                  <td>{cartProduct.name}</td>
                  <td>{cartProduct.price}</td>
                  <td>{cartProduct.quantity}</td>
                  <td>{cartProduct.totalAmount}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <div style={{ marginTop: '30px', color: 'black', padding: '10px' }}>
        <p style={{ color: 'black', marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }}>Total Amount: ${totalAmount}</p>
        <p style={{ color: 'black', fontSize: '16px' }}>Thank you! Have a good one :)</p>
      </div>
    </div>
  );
});
