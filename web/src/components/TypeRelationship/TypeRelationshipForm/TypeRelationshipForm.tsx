import type {
  EditTypeRelationshipById,
  UpdateTypeRelationshipInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormTypeRelationship = NonNullable<
  EditTypeRelationshipById['typeRelationship']
>

interface TypeRelationshipFormProps {
  typeRelationship?: EditTypeRelationshipById['typeRelationship']
  onSave: (
    data: UpdateTypeRelationshipInput,
    id?: FormTypeRelationship['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const TypeRelationshipForm = (props: TypeRelationshipFormProps) => {
  const onSubmit = (data: FormTypeRelationship) => {
    props.onSave(data, props?.typeRelationship?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTypeRelationship> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="label"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Label
        </Label>

        <TextField
          name="label"
          defaultValue={props.typeRelationship?.label}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="label" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TypeRelationshipForm
