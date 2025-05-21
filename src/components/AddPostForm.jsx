// src/components/AddPostForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostStore } from '../store/postStore';

const postSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  content: z
    .string()
    .min(10, 'Le contenu doit contenir au moins 10 caractères'),
});

const AddPostForm = () => {
  const addPost = usePostStore((state) => state.addPost);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data) => {
    await addPost(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Titre" />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register('content')} placeholder="Contenu" />
      {errors.content && <p>{errors.content.message}</p>}

      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddPostForm;
