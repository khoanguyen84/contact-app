import './App.css'
import { Routes, Route } from 'react-router-dom'
import ContactPage from './pages/contact-page'
import ContactList from './components/contacts/contact-list'
import CreateContact from './components/contacts/create-contact'
import ContactDetail from './components/contacts/contact-detail'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ContactPage />}>
          <Route path='/list' element={<ContactList />} />
          <Route path='/create' element={<CreateContact />} />
          <Route path='/detail/:contactid' element={<ContactDetail/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
