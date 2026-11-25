import DisabledSubmitForm from './DisabledSubmitForm'
import EnabledSubmitForm from './EnabledSubmitForm'
import MultiSelectComboBox from './MultiSelectComboBox'
import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>Disabled Button on Forms</h1>
          <DisabledSubmitForm />
        </div>
        
        <div>
          <h1>Always-enabled submit button</h1>
          <EnabledSubmitForm />
        </div>

         <div>
          <h1>Status multiselect</h1>
          <MultiSelectComboBox />
        </div>
      </section>
    </>
  )
}

export default App
