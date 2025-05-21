import React from 'react';
import { useForm } from 'react-hook-form';
import { createPost } from '../services/posts';

const AddPostForm = ({ onPostAdded }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await createPost(data);
    onPostAdded();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Titre" required />
      <textarea {...register('content')} placeholder="Contenu" required />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddPostForm;
