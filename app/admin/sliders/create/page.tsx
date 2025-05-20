import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import { createSliderAction } from '@/utils/actions'
import React from 'react'

function CreateSlider() {
  return (
	<section>
    <h1 className='text-2xl font-semibold mb-8 capitalize'>create slider</h1>
      <div className='border p-8 rounded-md'>
      <FormContainer action={createSliderAction}>
		     <FormInput
              type='text'
              name='title'
              label='slider title'
              
            />
            <ImageInput />
          <SubmitButton text='Create Slider' className='mt-8' />
        </FormContainer>
      </div>

  </section>
  )
}

export default CreateSlider