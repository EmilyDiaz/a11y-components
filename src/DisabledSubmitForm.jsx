import { forwardRef, useState } from 'react'
import {
  Button,
  TextInput,
  Label,
  DatePicker,
  Tooltip,
} from '@trussworks/react-uswds'

const TooltipTrigger = forwardRef(function TooltipTrigger(props, ref) {
  return <span {...props} ref={ref} />
})

function DisabledSubmitForm() {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const missingFields = [
    !name.trim() && 'Name',
    !dob.trim() && 'Date of birth',
  ].filter(Boolean)
  const isSubmitDisabled = missingFields.length > 0
  const submitButton = (
    <Button type="submit" disabled={isSubmitDisabled}>
      Submit
    </Button>
  )

  return (
    <form noValidate>
      <div>
        <Label requiredMarker={true} for="name">
          Enter your name:
        </Label>
        <TextInput
          id="name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <Label requiredMarker={true} for="dob">
          Enter your date of birth:
        </Label>
        <div className="usa-hint" id="appointment-date-hint">
          mm/dd/yyyy
        </div>
        <DatePicker
          id="dob"
          name="dob"
          dateFormat="MM/DD/YYYY"
          required
          onChange={(value) => setDob(value ?? '')}
        />
      </div>
      {isSubmitDisabled ? (
        <Tooltip
          asCustom={TooltipTrigger}
          label={
            <>
              <span>Following fields are required:</span>
              <ul>
                {missingFields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            </>
          }
          position="top"
        >
          {submitButton}
        </Tooltip>
      ) : (
        submitButton
      )}
    </form>
  )
}

export default DisabledSubmitForm
