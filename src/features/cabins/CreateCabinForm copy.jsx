import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: () => {
      toast.error('Cabin cant be created');
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.max_capacity?.message}>
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          id='description'
          {...register('description', { required: 'This field is required' })}
          defaultValue=''
        />
      </FormRow>

      <FormRow label={'Cabin photo'} error={errors?.image?.message}>
        <FileInput
          disabled={isCreating}
          id='image'
          {...register('image', { required: 'This field is required' })}
          accept='image/*'
        />
      </FormRow>

      <FormRow label={'Cabin features'}>
        <Button variation='secondary' type='reset' disabled={isCreating}>
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
