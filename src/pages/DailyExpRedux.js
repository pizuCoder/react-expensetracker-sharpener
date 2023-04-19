import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addExpenseSlice, updateExpenseSlice} from "../redux/ExpReducer";
// import AuthContext from "../Store/storeContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import DailyExpDisplayRedux from "./DailyExpDisplayRedux";

export default function DailyExpRedux() {
  const email = useSelector((state) => state.auth.email);
  const firebaseDB = `https://expensetracker-sharpener-default-rtdb.firebaseio.com/${email.replace(
    /[.@]/g,
    ""
  )}`;
  const dispatch = useDispatch();
  // const { addExpense, updateExpense , editExpense} = useContext(AuthContext);
  const amountSpentRef = useRef(null);
  const descriptionRef = useRef(null);
  //   const categoryRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleAddExpense = () => {
    console.log('adding expense');
    const amountSpent = amountSpentRef.current.value;
    const description = descriptionRef.current.value;
    const category = selectedCategory;

    if (selectedExpense) {
      const updatedExpense = {
        id: selectedExpense.id,
        amount: amountSpent,
        description: description,
        category: category,
      };
      // updateExpense(updatedExpense);
      // dispatch(ExpSlice.updateExpense(updatedExpense))
      //   dispatch(expActions.updateExistingExpense(updatedExpense))
      const updateExpense = async (updatedExpense) => {
        try {
          const response = await axios.put(
            `${firebaseDB}/${updatedExpense.id}.json`,
            {
              id: updatedExpense.id,
              amount: updatedExpense.amount,
              description: updatedExpense.description,
              category: updatedExpense.category,
            }
          );
          dispatch(updateExpenseSlice(updatedExpense));
            return response
        //   if (!response.ok) {
        //     throw new Error("Failed to update expense");
        //   }
        } catch (error) {
          console.error(error);
        }
      };
      updateExpense(updatedExpense)
      setSelectedExpense(null);
    } else {
      // addExpense(amountSpent, description, category);

      //   dispatch(expActions.addNewExpense({amountSpent, description, category}))
      const addExpense = async (amountSpent, description, category) => {
        const newExpItem = {
          amount: amountSpent,
          description: description,
          category: category,
        };
        // console.log(newExpItem)
        const res = await axios.post(`${firebaseDB}.json`, newExpItem);
        // const data = res.data
        // console.log(res)

        const resGet = await axios.get(`${firebaseDB}/${res.data.name}.json`);
        const loadedExpItem = {
          id: res.data.name,
          amount: resGet.data.amount,
          description: resGet.data.description,
          category: resGet.data.category,
        };
        dispatch(
        //   setExpense((prevExpItems) => [...prevExpItems, loadedExpItem])
        addExpenseSlice(loadedExpItem)
        );
      };
      addExpense(amountSpent, description, category);
    }

    amountSpentRef.current.value = "";
    descriptionRef.current.value = "";
    setSelectedCategory("Category");
  };

  const handleEditExpense = (expItem) => {
    // editExpense(expItem.id,expItem.amount, expItem.description, expItem.category );
    // dispatch(expActions.editExistingExpense(expItem.id,expItem.amount, expItem.description, expItem.category))
    const editExpense = async (id, amountSpent, description, category) => {
      const resGet = await axios.get(`${firebaseDB}/${id}.json`);
      amountSpent = resGet.data.amount;
      description = resGet.data.description;
      category = resGet.data.category;
    };
    editExpense(
      expItem.id,
      expItem.amountSpent,
      expItem.description,
      expItem.category
    );
    setSelectedExpense(expItem);
    amountSpentRef.current.value = expItem.amount;
    descriptionRef.current.value = expItem.description;
    setSelectedCategory(expItem.category);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Form>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Amount Spent"
              className="mb-2"
            >
              <Form.Control
                type="number"
                placeholder="Enter amount in Rs"
                ref={amountSpentRef}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Description"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="Expenditure Description"
                ref={descriptionRef}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Dropdown onSelect={(eventKey) => setSelectedCategory(eventKey)}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedCategory ? selectedCategory : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                <Dropdown.Item eventKey="Entertainment">
                  Entertainment
                </Dropdown.Item>
                <Dropdown.Item eventKey="Groceries">Groceries</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="Miscellaneous">
                  Miscellaneous
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Button variant="dark" onClick={handleAddExpense}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
      <DailyExpDisplayRedux onEditExpense={handleEditExpense} />
    </div>
  );
}
