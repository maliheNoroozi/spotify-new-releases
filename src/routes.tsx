import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
    </Routes>
  </Router>
)

export default AppRoutes
