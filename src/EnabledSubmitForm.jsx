import { useState } from 'react'
import {
  Button,
  TextInput,
  Label,
  DatePicker,
  ErrorMessage,
} from '@trussworks/react-uswds'

function EnabledSubmitForm() {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const showNameError = hasAttemptedSubmit && !name.trim()
  const showDobError = hasAttemptedSubmit && !dob.trim()

  function handleSubmit(event) {
    event.preventDefault()
    setHasAttemptedSubmit(true)

    const firstMissingField = !name.trim()
      ? 'name-always-enabled'
      : !dob.trim()
        ? 'dob-always-enabled'
        : null

    if (firstMissingField) {
      document.getElementById(firstMissingField)?.focus()
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div class="formfields">
        <div>

          <Label
            requiredMarker={true}
            error={showNameError}
            for="name-always-enabled"
          >
            Enter your name:
          </Label>
          {showNameError && (
            <ErrorMessage id="name-always-enabled-error">
              Enter your name.
            </ErrorMessage>
          )}
          <TextInput
            id="name-always-enabled"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            validationStatus={showNameError ? 'error' : undefined}
            aria-invalid={showNameError}
            aria-describedby={
              showNameError ? 'name-always-enabled-error' : undefined
            }
          />
        </div>

        <div>

          <Label
            requiredMarker={true}
            error={showDobError}
            for="dob-always-enabled"
          >
            Enter your date of birth:
          </Label>
          <div className="usa-hint" id="always-enabled-date-hint">
            mm/dd/yyyy
          </div>
          {showDobError && (
            <ErrorMessage id="dob-always-enabled-error">
              Enter your date of birth.
            </ErrorMessage>
          )}
          <DatePicker
            id="dob-always-enabled"
            name="dob"
            dateFormat="MM/DD/YYYY"
            required
            value={dob}
            onChange={(value) => setDob(value ?? '')}
            validationStatus={showDobError ? 'error' : undefined}
            aria-invalid={showDobError}
            aria-describedby={
              showDobError
                ? 'dob-always-enabled-error always-enabled-date-hint'
                : 'always-enabled-date-hint'
            }
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default EnabledSubmitForm
