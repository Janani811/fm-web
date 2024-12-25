import axios from '@/api/instance';

// List errors
export const get = () => axios.get('/error');

export const post = (data: {
  er_title: string;
  er_description: string;
  er_tags?: string[];
}) => axios.post('/error', data);
