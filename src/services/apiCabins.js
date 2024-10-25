import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabin').select('*');

  if (error) {
    console.log(error);
    throw new Error('Unable to fetch data');
  }

  return data;
}
