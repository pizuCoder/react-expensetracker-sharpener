import  Button  from "react-bootstrap/Button";

export default function Welcome() {
    const welcomeImage = 'https://images.unsplash.com/photo-1518183214770-9cffbec72538?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  
    return (
      <div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            display: "grid",
            placeItems: "center",
            backgroundImage: `url(${welcomeImage})`,
            
          }}
        >
          <div style={{ color: "white", padding: '1rem', borderRadius: '1rem',backgroundColor: 'black'}}>
            <h1 style={{ fontWeight: "bolder", fontSize: '90px', marginBottom: '1rem' }}>The Expense Tracker</h1>
            <h4 style={{marginBottom: '1rem'}}>
                Keep track of your expenses and save money with 
                expense tracker app.
              </h4>
              <a href='/dailyexp'><Button variant="primary" size="lg">
                Get Started
              </Button></a>
          </div>
        </div>
      </div>
    );
  }