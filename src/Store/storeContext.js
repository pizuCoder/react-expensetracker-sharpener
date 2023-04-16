import React, { useState, useEffect } from "react";
import axios from "axios"

const firebaseDB = 'https://expensetracker-sharpener-default-rtdb.firebaseio.com/expenses'

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  email: "",
  setEmail: () => {},
  expItems: [],
  addExpense: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const storedEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(storedEmail);
  const [expItems, setExpItems] = useState([])

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

      setExpItems(loadedExpItems);
    };

    fetchData();
  }, []);

  const addExpense = async(amountSpent, description, category) => {
    const newExpItem = {
      amount: amountSpent,
      description: description,
      category: category
    };
    const res = await axios.post(`${firebaseDB}.json`, newExpItem)
    // const data = res.data
    console.log(res)

    const resGet = await axios.get(`${firebaseDB}/${res.data.name}.json`)
    const loadedExpItem = {
      id: res.data.name,
      amount: resGet.data.amount,
      description: resGet.data.description,
      category: resGet.data.category,
    };
    setExpItems((prevExpItems) => [...prevExpItems, loadedExpItem]);
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (userIsLoggedIn) {
      const loginTime = Date.now();
      localStorage.setItem("loginTime", loginTime);

      const checkInactive = () => {
        const currentTime = Date.now();
        const loginTime = localStorage.getItem("loginTime");
        const inactiveTime = currentTime - loginTime;
        const minutesInactive = Math.floor(inactiveTime / 1000 / 60);

        if (minutesInactive >= 5) {
          logoutHandler();
          window.location.href = "/signup"; // Redirect to the logout page
        }
      };

      const timer = setInterval(checkInactive, 1000);

      return () => clearInterval(timer);
    }
  }, [userIsLoggedIn]);

  const setEmailHandler = (email) => {
    setEmail(email);
    localStorage.setItem("email", email);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    email,
    setEmail: setEmailHandler,
    addExpense: addExpense,
    expItems: expItems
  };
  // console.log(contextValue.email)

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
