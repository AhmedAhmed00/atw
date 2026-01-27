import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { cn } from '@/lib/utils'

interface PhoneInputFieldProps {
  value?: string
  onChange: (value: string | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PhoneInputField({
  value,
  onChange,
  placeholder = 'Enter phone number',
  disabled = false,
  className,
}: PhoneInputFieldProps) {
  return (
    <div className={cn('phone-input-wrapper', className)}>
      <PhoneInput
        international
        defaultCountry="US"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          height: 'var(--input-height)',
          paddingLeft: 'var(--input-padding-x)',
          paddingRight: 'var(--input-padding-x)',
          paddingTop: 'var(--input-padding-y)',
          paddingBottom: 'var(--input-padding-y)',
          borderWidth: 'var(--input-border-width)',
          // borderColor: 'var(--input-border-color)',
          borderRadius: 'var(--input-border-radius)',
          backgroundColor: 'var(--input-bg)',
          fontSize: 'var(--input-text-size)',
        }}
        className={cn(
          'flex w-full ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          '[&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-sm',
          '[&_.PhoneInputCountrySelect]:border-0 [&_.PhoneInputCountrySelect]:bg-transparent',
          '[&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:h-4',
          '[&_.PhoneInputCountrySelectArrow]:opacity-60'
        )}
      />
      <style>{`
        .phone-input-wrapper .PhoneInput {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .phone-input-wrapper .PhoneInputInput {
          flex: 1;
          min-width: 0;
        }
        .phone-input-wrapper .PhoneInputCountry {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .phone-input-wrapper .PhoneInputCountryIcon {
          width: 24px;
          height: 16px;
          border-radius: 2px;
        }
        .phone-input-wrapper .PhoneInputCountrySelect {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 1;
          border: 0;
          opacity: 0;
          cursor: pointer;
        }
        .phone-input-wrapper .PhoneInputCountrySelectArrow {
          display: block;
          content: '';
          width: 6px;
          height: 6px;
          border-style: solid;
          border-color: currentColor;
          border-top-width: 0;
          border-bottom-width: 1px;
          border-left-width: 0;
          border-right-width: 1px;
          transform: rotate(45deg);
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}

