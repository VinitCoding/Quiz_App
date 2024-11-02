import { PinInput as ChakraPinInput, Group } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const PinInput = forwardRef(function PinInput(props, ref) {
  const { count = 4, inputProps, rootRef, attached, ...rest } = props
  return (
    <ChakraPinInput.Root ref={rootRef} {...rest}>
      <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
      <ChakraPinInput.Control>
        <Group attached={attached}>
          {Array.from({ length: count }).map((_, index) => (
            <ChakraPinInput.Input key={index} index={index} className='bg-white border-black w-[10%] h-[20%] text-center mx-5'/>
          ))}
        </Group>
      </ChakraPinInput.Control>
    </ChakraPinInput.Root>
  )
})
