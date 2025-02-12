import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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
    console.log(data);
    mutate(data);
  }

  function onError(errors) {
    console.log(errors);
    console.log(getValues());
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.message && (
          <Error role='alert'>{errors?.name?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
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
        {errors?.max_capacity?.message && (
          <Error role='alert'>{errors?.max_capacity?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
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
        {errors?.regular_price?.message && (
          <Error role='alert'>{errors?.regular_price?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
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
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='number'
          id='description'
          {...register('description', { required: 'This field is required' })}
          defaultValue=''
        />
        {errors?.description?.message && (
          <Error role='alert'>{errors?.description?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput
          id='image'
          {...register('image', { required: 'This field is required' })}
          accept='image/*'
        />
        {errors?.image?.message && (
          <Error role='alert'>{errors?.image?.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' disabled={isCreating}>
          Cancel
        </Button>
        <Button>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
