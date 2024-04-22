import './App.css'
import { Routes, Route } from 'react-router-dom'
import ContactPage from './pages/contact-page'
import ContactList from './components/contacts/contact-list'
import CreateContact from './components/contacts/create-contact'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ContactPage />}>
          <Route path='/list' element={<ContactList />} />
          <Route path='/create' element={<CreateContact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
