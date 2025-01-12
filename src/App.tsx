import { Container } from "@mui/material"
import AppRoutes from "./routes"

import "./App.css"

const App = () => {
  return (
    <Container sx={{ marginY: "40px" }}>
      <AppRoutes />
    </Container>
  )
}

export default App
