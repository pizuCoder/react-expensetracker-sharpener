// import { useContext } from "react";
// import AuthContext from "../Store/storeContext";
import { deleteExpense } from "../redux/ExpReducer";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";

export default function DailyExpDisplay(props) {
  const dispatch = useDispatch();
  // const authContext = useContext(AuthContext);
  const handleEditExpense = (expItem) => {
    props.onEditExpense(expItem);
  };
  // const cartItems = useSelector((state) => state.expenses);
  // console.log(cartItems);
  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      {/* <tbody>
        {cartItems.map((expItem) => (
          <tr key={expItem.description}>
            <td>{expItem.amount}</td>
            <td>{expItem.description}</td>
            <td>{expItem.category}</td>
            <td>
              <Button
                variant="warning"
                onClick={() => {
                  handleEditExpense(expItem);
                }}
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                variant="danger"
                // onClick={() => authContext.deleteExpense(expItem.id)}
                onClick={() => dispatch(deleteExpense(expItem.id))}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody> */}
    </table>
  );
}
