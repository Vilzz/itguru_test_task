import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase, { type InputBaseProps } from '@mui/material/InputBase'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'

type Props = InputBaseProps & {
  label?: string
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  clearable?: boolean
  error?: boolean
  required?: boolean
  onClear?: () => void
}

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

const StyledInput = styled(InputBase, {
  shouldForwardProp: (prop) => !['error'].includes(prop as string),
})<{ error?: boolean }>(({ theme, error }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    borderRadius: 12,
    border: '1px solid',
    borderColor: error ? theme.palette.error.main : '#C9C9C9',
    fontSize: 16,
    padding: '16px 44px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
      boxShadow: `${alpha(
        error ? theme.palette.error.main : theme.palette.primary.main,
        0.25,
      )} 0 0 0 0.2rem`,
    },
    '&:disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
}))

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  lineHeight: '150%',
  letterSpacing: '-1.5%',
  position: 'static',
  transform: 'none',
  marginBottom: '4px',
  fontSize: 18,
  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
}))

const StartIcon = styled('div')({
  position: 'absolute',
  left: 12,
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
})

const EndIcon = styled('div')({
  position: 'absolute',
  right: 8,
  display: 'flex',
  alignItems: 'center',
})

export const ItGuruTextField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    helperText,
    startIcon,
    endIcon,
    clearable = false,
    onClear,
    error,
    required,
    value,
    onChange,
    disabled,
    id,
    ...muiProps
  } = props

  const reactId = React.useId()
  const inputId = id ?? reactId

  const handleClear = () => {
    onClear?.()

    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>

      onChange(event)
    }
  }
  const inputValue = (value ?? '') as string
  const showClear = clearable && inputValue.length > 0

  return (
    <FormControl fullWidth error={error} disabled={disabled} required={required} variant='standard'>
      {label && (
        <StyledInputLabel shrink htmlFor={inputId}>
          {label}
        </StyledInputLabel>
      )}

      <Wrapper>
        {startIcon && <StartIcon>{startIcon}</StartIcon>}

        <StyledInput
          {...muiProps}
          id={inputId}
          inputRef={ref}
          value={inputValue}
          onChange={onChange}
          disabled={disabled}
          error={error}
        />

        <EndIcon>
          {showClear ? (
            <IconButton size='small' onClick={handleClear} disabled={disabled}>
              <ClearIcon />
            </IconButton>
          ) : (
            endIcon
          )}
        </EndIcon>
      </Wrapper>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
})
