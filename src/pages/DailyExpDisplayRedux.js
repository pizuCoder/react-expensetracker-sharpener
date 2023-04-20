import React, { useEffect, useMemo} from "react";
// import AuthContext from "../Store/storeContext";
import './DailyExpDisplayRedux.css'
import { setExpense, deleteExpenseSlice, setPremieum } from "../redux/ExpReducer";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function DailyExpDisplayRedux(props) {

  const email = useSelector((state) => state.auth.email);
  
  const firebaseDB = `https://expensetracker-sharpener-default-rtdb.firebaseio.com/${email.replace(
    /[.@]/g,
    ""
  )}`;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.expense.items);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${firebaseDB}.json`);
      const data = response.data;
      const loadedExpItems = [];

      for (const key in data) {
        loadedExpItems.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
      }

      dispatch(setExpense(loadedExpItems));
    };

    fetchData();
  }, [dispatch, firebaseDB, cartItems]);
  // const [loading, setLoading] = useState(true);

  // const authContext = useContext(AuthContext);
  const handleEditExpense = (expItem) => {
    props.onEditExpense(expItem);
  };

  
  // console.log(cartItems);

  const deleteExpense = async (id) => {
    await axios.delete(`${firebaseDB}/${id}.json`);
    dispatch(
      deleteExpenseSlice(id)
    );   
  };
  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + Number(item.amount), 0);
  }, [cartItems]);

  // const[showPremium, setShowPremium] = useState(false)
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
// if(totalAmount >= 10000){
//   setShowPremium(true)

// }

function convertToCSV(items) {
  const headers = ['Amount', 'Description', 'Category'];
  const rows = items.map(item => [item.amount, item.description, item.category]);
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  return csv;
}
const isPremieum = useSelector((state)=> state.expense.premieum)
//   return (
//     <div>
//     <table>
//       <thead>
//         <tr>
//           <th>Amount</th>
//           <th>Description</th>
//           <th>Category</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cartItems.map((expItem) => (
//           <tr key={expItem.description}>
//             <td>{expItem.amount}</td>
//             <td>{expItem.description}</td>
//             <td>{expItem.category}</td>
//             <td>
//               <Button
//                 variant="warning"
//                 onClick={() => {
//                   handleEditExpense(expItem);
//                 }}
//               >
//                 Edit
//               </Button>
//             </td>
//             <td>
//               <Button
//                 variant="danger"
//                 // onClick={() => authContext.deleteExpense(expItem.id)}
//                 onClick={() => deleteExpense(expItem.id)}
//               >
//                 Delete
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
    
//     <div>Total Amount: {totalAmount}</div>
//     {totalAmount>=10000 && <Button variant="primary" onClick={() => dispatch(setPremieum())}>{isPremieum ? 'Deactivate':'Activate Premium'}</Button>}
//   {isPremieum && <Button variant="success" onClick={() => {
// const csv = convertToCSV(cartItems);
// const link = document.createElement('a');
// link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
// link.setAttribute('download', 'cartItems.csv');
// document.body.appendChild(link);
// link.click();
// }}>
// Download Cart Items as CSV
// </Button>}

//     </div>
//   );
return (
  <div className={props.darkMode ? 'dark' : 'light'} style={{padding: '1rem', borderRadius: '.5rem'}}>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ padding: '12px 15px' }}>Amount</th>
          <th style={{ padding: '12px 15px' }}>Description</th>
          <th style={{ padding: '12px 15px' }}>Category</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((expItem) => (
          <tr key={expItem.description}>
            <td style={{ padding: '12px 15px' }}>{expItem.amount}</td>
            <td style={{ padding: '12px 15px' }}>{expItem.description}</td>
            <td style={{ padding: '12px 15px' }}>{expItem.category}</td>
            <td>
              <Button
                variant="warning"
                style={{ backgroundColor: '#ffc107', border: 'none', marginRight: '5px' }}
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
                style={{ backgroundColor: '#dc3545', border: 'none' }}
                onClick={() => deleteExpense(expItem.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>Total Amount: {totalAmount}</div>
    {totalAmount >= 10000 && (
      <Button
        variant="primary"
        style={{ backgroundColor: '#007bff', border: 'none', marginTop: '10px' }}
        onClick={() => dispatch(setPremieum())}
      >
        {isPremieum ? 'Deactivate' : 'Activate Premium'}
      </Button>
    )}
    {isPremieum && (
      <Button
        variant="success"
        style={{ backgroundColor: '#28a745', border: 'none', marginTop: '10px', marginLeft: '10px' }}
        onClick={() => {
          const csv = convertToCSV(cartItems);
          const link = document.createElement('a');
          link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
          link.setAttribute('download', 'cartItems.csv');
          document.body.appendChild(link);
          link.click();
        }}
      >
        Download Cart Items as CSV
      </Button>
    )}
  </div>
);

}
