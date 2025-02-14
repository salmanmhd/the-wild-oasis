import { max } from 'date-fns';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const { isLoading, settings = {}, error } = useSettings();
  const {
    min_booking_length: minNights,
    max_booking_length: maxNights,
    max_guest_per_booking: maxGuests,
    breakfast_price: breakfastPrice,
  } = settings;

  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdate(e, fieldName) {
    console.log(e.target.value);
    updateSettings({ [fieldName]: e.target.value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          disabled={isUpdating}
          defaultValue={minNights}
          type='number'
          id='min-nights'
          onBlur={(e) => handleUpdate(e, 'min_booking_length')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          defaultValue={maxNights}
          type='number'
          id='max-nights'
          onBlur={(e) => handleUpdate(e, 'max_booking_length')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          defaultValue={maxGuests}
          type='number'
          id='max-guests'
          onBlur={(e) => handleUpdate(e, 'max_guest_per_booking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          defaultValue={breakfastPrice}
          type='number'
          id='breakfast-price'
          onBlur={(e) => handleUpdate(e, 'breakfast_price')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
