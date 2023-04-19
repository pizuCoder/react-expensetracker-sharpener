import { useState, useEffect } from "react";
// import AuthContext from "../Store/storeContext";
import { expActions } from "../redux/ExpReducer";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";


function DailyExpDisplay(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(expActions.fetchExpenseById());
  }, [dispatch]);
  // const [loading, setLoading] = useState(true);

  // const authContext = useContext(AuthContext);
  const handleEditExpense = (expItem) => {
    props.onEditExpense(expItem);
  };
  const cartItems = useSelector((state) => state.expenses);
  console.log(cartItems);

  
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.items.map((expItem) => (
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
                onClick={() => dispatch(expActions.deleteExistingExpense(expItem.id))}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
