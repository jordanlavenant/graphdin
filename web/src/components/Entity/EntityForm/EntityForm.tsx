import type { EditEntityById, UpdateEntityInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useState } from 'react'

type FormEntity = NonNullable<EditEntityById['entity']>

interface EntityFormProps {
  entity?: EditEntityById['entity']
  onSave: (data: UpdateEntityInput, id?: FormEntity['id']) => void
  error: RWGqlError
  loading: boolean
}

const EntityForm = (props: EntityFormProps) => {

  const [formKey, setFormKey] = useState(0)

  const onSubmit = (data: FormEntity) => {
    props.onSave(data, props?.entity?.id)
    setFormKey(prevKey => prevKey + 1)

  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEntity> key={formKey} onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="firstName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          First name
        </Label>

        <TextField
          name="firstName"
          defaultValue={props.entity?.firstName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="firstName" className="rw-field-error" />

        <Label
          name="lastName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Last name
        </Label>

        <TextField
          name="lastName"
          defaultValue={props.entity?.lastName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="lastName" className="rw-field-error" />

        <Label
          name="age"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Age
        </Label>

        <NumberField
          name="age"
          defaultValue={props.entity?.age}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="age" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EntityForm
