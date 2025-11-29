import { Link } from 'react-router-dom';

const Homepage = () => (
  <div>
    <h1>Welcome to Quiz Management</h1>
    <p>Manage quizzes and tasks for your classes.</p>
    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
  </div>
);

export default Homepage;