import { OTPFieldPreview as OTPPrimitive } from '@base-ui/react/otp-field'
import { cn } from '@ui/utils/cn'
import styles from './OTP.module.css'

export function Root({ className, ...props }: OTPPrimitive.Root.Props) {
	return <OTPPrimitive.Root className={cn(className, styles.Root)} {...props} />
}

export function Input({ className, ...props }: OTPPrimitive.Input.Props) {
	return (
		<OTPPrimitive.Input className={cn(className, styles.Input)} {...props} />
	)
}
