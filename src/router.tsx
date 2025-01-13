import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { ErrorFallback } from "./components/ErrorFallback"
import { Auth } from "./features/auth/Auth"
import { NewReleases } from "./features/newReleases/NewReleases"

const AppRouter = () => (
  <ErrorBoundary fallback={ErrorFallback}>
    <Auth>
      <Router>
        <Routes>
          <Route path="/" element={<NewReleases />} />
        </Routes>
      </Router>
    </Auth>
  </ErrorBoundary>
)

export default AppRouter
