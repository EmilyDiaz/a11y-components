import { useEffect, useRef, useState } from 'react'
import { Checkbox, Label } from '@trussworks/react-uswds'

const statusOptions = [
  { value: 'approved', label: 'Approved' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]

const statusValues = statusOptions.map((option) => option.value)

function MultiSelectComboBox() {
  const [selectedStatuses, setSelectedStatuses] = useState(statusValues)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const optionsRef = useRef(null)
  const triggerRef = useRef(null)
  const checkboxRefs = useRef([])
  const allSelected = selectedStatuses.length === statusOptions.length
  const selectionLabel =
    selectedStatuses.length === statusOptions.length
      ? 'All'
      : selectedStatuses.length === 1
        ? statusOptions.find((option) => option.value === selectedStatuses[0])
            .label
        : selectedStatuses.length > 1
          ? `${selectedStatuses.length} items selected`
          : 'None'

  useEffect(() => {
    if (isOpen) {
      optionsRef.current?.scrollIntoView({ block: 'nearest' })
      checkboxRefs.current[0]?.focus({ preventScroll: true })
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function closeOnOutsideClick(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
    }
  }, [isOpen])

  function handleStatusChange(value, checked) {
    if (value === 'all') {
      setSelectedStatuses(checked ? statusValues : [])
      return
    }

    setSelectedStatuses((current) =>
      checked
        ? current.includes(value)
          ? current
          : [...current, value]
        : current.filter((status) => status !== value),
    )
  }

  function handleCheckboxKeyDown(event, index) {
    let nextIndex

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = Math.min(index + 1, statusOptions.length)
        break
      case 'ArrowUp':
        nextIndex = Math.max(index - 1, 0)
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = statusOptions.length
        break
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      default:
        return
    }

    event.preventDefault()
    checkboxRefs.current[nextIndex]?.focus({ preventScroll: true })
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      setIsOpen(false)
    }
  }

  function handleTabKeyDown(event) {
    if (event.key !== 'Tab') {
      return
    }

    const container = event.currentTarget
    window.setTimeout(() => {
      if (!container.contains(document.activeElement)) {
        setIsOpen(false)
      }
    }, 0)
  }

  const options = [
    { value: 'all', label: 'All' },
    ...statusOptions,
  ]

  return (
    <div
      className="multi-select-combobox"
      onKeyDown={handleTabKeyDown}
      ref={containerRef}
    >
      <Label htmlFor="status-multiselect">Status</Label>
      <button
        aria-controls="status-multiselect-options"
        aria-expanded={isOpen}
        aria-label={`Status: ${selectionLabel}`}
        className="usa-combo-box__input multi-select-combobox__trigger"
        id="status-multiselect"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        {selectionLabel}
      </button>
      <div
        aria-label="Status options"
        className="usa-combo-box__list multi-select-combobox__list"
        id="status-multiselect-options"
        hidden={!isOpen}
        ref={optionsRef}
      >
        <fieldset className="usa-fieldset multi-select-combobox__fieldset">
          <legend className="usa-sr-only">Choose statuses</legend>
          {options.map((option, index) => {
            const checked =
              option.value === 'all'
                ? allSelected
                : selectedStatuses.includes(option.value)

            return (
              <Checkbox
                checked={checked}
                id={`status-option-${option.value}`}
                inputRef={(element) => {
                  checkboxRefs.current[index] = element
                }}
                key={option.value}
                label={option.label}
                name={option.value === 'all' ? 'status-all' : 'status'}
                onChange={(event) =>
                  handleStatusChange(option.value, event.target.checked)
                }
                onKeyDown={(event) => handleCheckboxKeyDown(event, index)}
                value={option.value}
              />
            )
          })}
        </fieldset>
      </div>
    </div>
  )
}

export default MultiSelectComboBox
