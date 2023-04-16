import React, { useContext, useRef, useState } from "react";

import AuthContext from "../Store/storeContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import DailyExpDisplay from "./DailyExpDisplay";

export default function DailyExp() {
  const { addExpense } = useContext(AuthContext);
  const amountSpentRef = useRef(null);
  const descriptionRef = useRef(null);
//   const categoryRef = useRef(null);
const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddExpense = () => {
    addExpense(amountSpentRef.current.value, descriptionRef.current.value, selectedCategory);
    amountSpentRef.current.value = "";
    descriptionRef.current.value = "";
    // categoryRef.current.value = "";
    setSelectedCategory("Category")
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
            {/* <DropdownButton
              variant="outline-secondary"
              title={"category"}
              id="category-dropdown"
              className="mb-2"
            >
              <Dropdown.Item onClick={() => categoryRef.current.value = "Food"}>Food</Dropdown.Item>
              <Dropdown.Item onClick={() => categoryRef.current.value = "Entertainment"}>Entertainment</Dropdown.Item>
              <Dropdown.Item onClick={() => categoryRef.current.value = "Groceries"}>Groceries</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => categoryRef.current.value = "Miscellanious"}>Miscellanious</Dropdown.Item>
            </DropdownButton> */}
            <Dropdown
  onSelect={(eventKey) => setSelectedCategory(eventKey)}
>
  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
    {selectedCategory ? selectedCategory : "Category"}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
    <Dropdown.Item eventKey="Entertainment">Entertainment</Dropdown.Item>
    <Dropdown.Item eventKey="Groceries">Groceries</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item eventKey="Miscellaneous">Miscellaneous</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          </Col>
          <Col>
            <Button variant="dark" onClick={handleAddExpense}>Add</Button>
          </Col>
        </Row>
      </Form>
      <DailyExpDisplay />
    </div>
  );
}
