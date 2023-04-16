import { useContext } from "react";
import AuthContext from "../Store/storeContext";
import Button from "react-bootstrap/Button";

export default function DailyExpDisplay() {
  const authContext = useContext(AuthContext);

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
        {authContext.expItems.map((expItem) => (
          <tr key={expItem.description}>
            <td>{expItem.amount}</td>
            <td>{expItem.description}</td>
            <td>{expItem.category}</td>
            <td><Button>Delete</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
