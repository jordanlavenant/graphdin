import type {
  EditRelationshipById,
  UpdateRelationshipInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormRelationship = NonNullable<EditRelationshipById['relationship']>

interface RelationshipFormProps {
  relationship?: EditRelationshipById['relationship']
  onSave: (data: UpdateRelationshipInput, id?: FormRelationship['id']) => void
  error: RWGqlError
  loading: boolean
}

const RelationshipForm = (props: RelationshipFormProps) => {
  const onSubmit = (data: FormRelationship) => {
    props.onSave(data, props?.relationship?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRelationship> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="entityOneId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Entity one id
        </Label>

        <NumberField
          name="entityOneId"
          defaultValue={props.relationship?.entityOneId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="entityOneId" className="rw-field-error" />

        <Label
          name="entityTwoId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Entity two id
        </Label>

        <NumberField
          name="entityTwoId"
          defaultValue={props.relationship?.entityTwoId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="entityTwoId" className="rw-field-error" />

        <Label
          name="typeRelationshipId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type relationship id
        </Label>

        <NumberField
          name="typeRelationshipId"
          defaultValue={props.relationship?.typeRelationshipId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="typeRelationshipId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RelationshipForm
