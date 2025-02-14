import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editOptions } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editOptions : {},
  });

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
    console.log(getValues());
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          disabled={isWorking}
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.max_capacity?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='maxCapacity'
          {...register('max_capacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Max capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regular_price?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='regularPrice'
          {...register('regular_price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regulat price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type='number'
          id='discount'
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              (value >= 0 &&
                Number(value) < Number(getValues().regular_price)) ||
              'Discount should be less than regular price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          disabled={isWorking}
          id='description'
          {...register('description', { required: 'This field is required' })}
          defaultValue=''
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          disabled={isWorking}
          id='image'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
          accept='image/*'
        />
      </FormRow>

      <FormRow label={'Cabin features'}>
        <Button variation='secondary' type='reset' disabled={isWorking}>
          Cancel
        </Button>
        <Button>{isEditSession ? 'Update Cabin' : 'Create cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
